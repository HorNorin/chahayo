require 'rails_helper'

RSpec.describe AuthenticationToken do
  subject { authentication_token }
  let(:redis) { Redis.new }
  let(:expire) { 1.minute }
  let(:key) { "auth_token:#{token}" }
  let(:token) { '50c08a03-f9b1-4abf-bd41-81938e20222e' }
  let(:uuid) { '00f8046e-b459-4b08-bab5-6376a38c689e' }
  let(:authentication_token) { AuthenticationToken.instance }

  before do
    allow(SecureRandom).to receive(:uuid).and_return(token)
    allow(authentication_token).to receive(:store).and_return(redis)
    allow(authentication_token).to receive(:expire).and_return(expire)
  end

  it 'should return single insatnce' do
    expect(authentication_token).to eq(AuthenticationToken.instance)
  end

  describe '#generate' do
    before do
      allow(redis).to receive(:set).with(key, uuid)
      allow(redis).to receive(:expire).with(key, expire)
      allow(redis).to receive(:exists).and_return(false)
      authentication_token.generate(uuid)
    end

    it 'should create new redis key with value set to uuid' do
      expect(redis).to have_received(:set).with(key, uuid)
    end

    it 'should set expiration on redis key' do
      expect(redis).to have_received(:expire).with(key, expire)
    end

    it 'should return newly generated token' do
      expect(authentication_token.generate(uuid)).to eq(token)
    end
  end

  describe '#uuid' do
    before { authentication_token.generate(uuid) }

    it 'should return uuid used in generate method' do
      expect(authentication_token.uuid(token)).to eq(uuid)
    end
  end

  describe '#renew' do
    context 'token exists' do
      before do
        allow(redis).to receive(:expire).with(key, expire)
        allow(redis).to receive(:exists).and_return(true)
        authentication_token.renew(token)
      end
      it 'should set new expiration' do
        expect(redis).to have_received(:expire).with(key, expire)
      end
    end

    context 'token does not exists' do
      before do
        allow(redis).to receive(:expire)
        allow(redis).to receive(:exists).and_return(false)
      end
      it 'should do nothing' do
        expect(redis).not_to have_received(:expire)
      end
    end
  end

  describe '#revoke' do
    context 'token exists' do
      before do
        allow(redis).to receive(:del).with(key)
        allow(redis).to receive(:exists).and_return(true)
        authentication_token.revoke(token)
      end
      it 'should set new expiration' do
        expect(redis).to have_received(:del).with(key)
      end
    end

    context 'token does not exists' do
      before do
        allow(redis).to receive(:del)
        allow(redis).to receive(:exists).and_return(false)
      end
      it 'should do nothing' do
        expect(redis).not_to have_received(:del)
      end
    end
  end
end
