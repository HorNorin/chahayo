require 'rails_helper'

RSpec.describe SessionController, type: :controller do
  routes { Api::Engine.routes }

  describe 'POST create' do
    let(:credential) { { email: 'user@example.com', password: 'secret' } }
    before { @user = FactoryGirl.create(:user, credential) }

    context 'with valid credential' do
      let(:token) { '50c08a03-f9b1-4abf-bd41-81938e20222e' }
      let(:user_with_token) { UserWithToken.new(token: token, user: @user) }

      before do
        allow(AuthenticationToken.instance).to receive(:generate).and_return(token)
        post :create, credential, format: :json
      end

      it 'should generate token' do
        expect(AuthenticationToken.instance).to have_received(:generate)
      end

      it 'should render user with token as JSON' do
        expect(response.body).to eq(UserWithTokenSerializer.new(user_with_token).to_json)
      end
    end

    context 'with invalid credential' do
      let(:invalid_credential) { { email: 'wrong@example.com', password: 'secret' } }

      before { post :create, invalid_credential, format: :json }
      it 'should render unauthorized as JSON' do
        expect(response.body).to eq('Bad credential')
        expect(response.status).to eq(301)
      end
    end
  end

  describe 'GET destroy' do
    context 'logged in' do
      let(:user) { FactoryGirl.build(:user) }
      let(:uuid) { '65e4ceb1-6a4d-44ac-a53e-23a8097bcf08' }
      let(:token) { '50c08a03-f9b1-4abf-bd41-81938e20222e' }

      before do
        request.env['HTTP_AUTHORIZATION'] = ActionController::HttpAuthentication::Token.encode_credentials(token)
        allow(User).to receive(:find_by).with({uuid: uuid}).and_return(user)
        allow(AuthenticationToken.instance).to receive(:uuid).and_return(uuid)
        allow(AuthenticationToken.instance).to receive(:revoke).with(token)
        get :destroy, nil, format: :json
      end

      it 'should delete token' do
        puts request.headers
        expect(AuthenticationToken.instance).to have_received(:revoke).once.with(token)
      end

      it 'should generate redirect response as JSON' do
        expect(response.body).to eq('Successfully logout.')
        expect(response.status).to eq(301)
      end
    end

    context 'not logged in' do
      before { get :destroy, nil, format: :json }

      it 'should render unauthorized as JSON' do
        expect(response.body).to eq('Access denied')
        expect(response.status).to eq(401)
      end
    end
  end
end
