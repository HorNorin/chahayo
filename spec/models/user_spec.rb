require 'rails_helper'

RSpec.describe User, type: :model do
  subject { user }
  let(:user) { FactoryGirl.build(:user) }

  describe 'attributes' do
    it { is_expected.to respond_to(:uuid) }
    it { is_expected.to respond_to(:slug) }
    it { is_expected.to respond_to(:username) }
    it { is_expected.to respond_to(:email) }
    it { is_expected.to respond_to(:password) }
    it { is_expected.to respond_to(:password_digest) }
    it { is_expected.to respond_to(:password_confirmation) }
  end

  describe 'validations' do
    before { user.valid? }

    context 'all attributes are valid' do
      it { is_expected.to be_valid }
    end

    context 'invalid attribute' do
      shared_examples 'an invalid attribute' do |attr, value, message|
        before do
          user.send("#{attr.to_sym}=", value)
          user.valid?
        end
        it { is_expected.not_to be_valid }
        it "should have one error on ##{attr}" do
          expect(user.errors[attr.to_sym]).not_to be_empty
        end
        it "should have error message '#{message}'" do
          expect(user.errors[attr.to_sym]).to include(message)
        end
      end

      describe '#uuid' do
        context 'not unique' do
          let(:uuid) { '50c08a03-f9b1-4abf-bd41-81938e20222e' }
          before { FactoryGirl.create(:user, uuid: uuid) }
          it_behaves_like 'an invalid attribute', 'uuid', '50c08a03-f9b1-4abf-bd41-81938e20222e', "has already been taken"
        end
      end

      describe '#email' do
        context 'not presence' do
          it_behaves_like 'an invalid attribute', 'email', nil, "can\'t be blank"
        end

        context 'not unique' do
          let(:email) { 'user@example.com' }
          before { FactoryGirl.create(:user, email: email) }
          it_behaves_like 'an invalid attribute', 'email', 'user@example.com', "has already been taken"
        end

        context 'not a valid email' do
          it_behaves_like 'an invalid attribute', 'email', 'user@example', 'is not a valid email address'
        end
      end

      describe '#password' do
        context 'not presence' do
          it_behaves_like 'an invalid attribute', 'password', nil, "can\'t be blank"
        end

        context 'less than 6 characters' do
          it_behaves_like 'an invalid attribute', 'password', '12345', 'is too short (minimum is 6 characters)'
        end

        context 'greater than 25 characters' do
          it_behaves_like 'an invalid attribute', 'password', '1'*26, 'is too long (maximum is 25 characters)'
        end
      end

      describe '#password_confirmation' do
        context 'not match' do
          before { user.password = 'secret' }
          it_behaves_like 'an invalid attribute', 'password_confirmation', 'not match', "doesn't match Password"
        end
      end

      describe '#username' do
        context 'not present' do
          it_behaves_like 'an invalid attribute', 'username', nil, "can't be blank"
        end

        context 'not unique' do
          let(:name) { 'norin' }
          before { FactoryGirl.create(:user, username: name) }
          it_behaves_like 'an invalid attribute', 'username', 'norin', "has already been taken"
        end
      end
    end
  end

  describe 'callbacks' do
    context 'before_create' do
      describe '#generate_uuid' do
        before do
          user.uuid = nil
          user.save
        end
        it 'should have generated uuid' do
          expect(user.uuid).not_to be_nil
        end
      end
    end

    context 'after_create' do
      describe '#slug' do
        before do
          user.slug = nil
          user.save
        end
        it 'should have generated slug' do
          expect(user.slug).not_to be_nil
        end
      end
    end
  end
end
