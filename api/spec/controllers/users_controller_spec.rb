require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  routes { Api::Engine.routes }

  shared_context 'user already logged in' do
    let(:uuid) { '65e4ceb1-6a4d-44ac-a53e-23a8097bcf08' }
    let(:token) { '50c08a03-f9b1-4abf-bd41-81938e20222e' }

    before do
      request.env['HTTP_AUTHORIZATION'] = ActionController::HttpAuthentication::Token.encode_credentials(token)
      allow(User).to receive(:find_by).with({uuid: uuid}).and_return(user)
      allow(AuthenticationToken.instance).to receive(:uuid).and_return(uuid)
    end
  end

  shared_examples 'authenticate' do
    before { get :show, nil, format: :json }

    it 'should render unauthorized as JSON' do
      expect(response.body).to eq('Access denied')
      expect(response.status).to eq(401)
    end
  end

  describe 'GET show' do
    context 'logged in' do
      include_context 'user already logged in'

      let(:user) { FactoryGirl.build(:user) }
      let(:user_with_token) { UserWithToken.new(token: token, user: user) }
      before { get :show, nil, format: :json }

      it 'should render current_user as JSON' do
        expect(response.body).to eq(UserWithTokenSerializer.new(user_with_token).to_json)
      end
    end

    context 'not logged in' do
      it_behaves_like 'authenticate'
    end
  end

  describe 'POST create' do
    context 'logged in' do
      include_context 'user already logged in'

      let(:user) { FactoryGirl.build(:user) }
      before { post :create, nil, format: :json }

      it 'should generate redirect response' do
        expect(response.body).to eq('Already logged in.')
        expect(response.status).to eq(301)
      end
    end

    context 'not logged in' do
      context 'with valid information' do
        subject { -> { post :create, user: user_params, format: :json } }
        let(:token) { '50c08a03-f9b1-4abf-bd41-81938e20222e' }
        let(:user_params) { FactoryGirl.attributes_for(:user) }
        let(:user) { FactoryGirl.build(:user, user_params) }
        let(:user_with_token) { UserWithToken.new(token: token, user: User.last) }

        before { allow(AuthenticationToken.instance).to receive(:generate).and_return(token) }

        it { is_expected.to change { User.count }.by(1) }

        it 'should render created user as JSON' do
          post :create, user: user_params, format: :json
          expect(response.body).to eq(UserWithTokenSerializer.new(user_with_token).to_json)
        end
      end

      context 'with invalid information' do
        let(:user) { FactoryGirl.build(:user, user_params) }
        let(:user_params) { FactoryGirl.attributes_for(:user, email: 'user@example') }

        before do
          user.valid?
          post :create, user: user_params, format: :json
        end

        it 'should render error messages as JSON' do
          expect(response.body).to eq(user.errors.to_json)
        end

        it 'should response with 422 status' do
          expect(response.status).to eq(422)
        end
      end
    end
  end

  describe 'PUT update' do
    context 'logged in' do
      include_context 'user already logged in'

      let(:user) { FactoryGirl.create(:user) }
      before do
        @old_email = user.email
        put :update, user: user_params, format: :json
      end

      context 'with valid information' do
        let(:user_params) { FactoryGirl.attributes_for(:user, email: 'change@email.com') }

        it 'should update user info' do
          user.reload
          expect(user.email).not_to eq(@old_email)
          expect(user.email).to eq('change@email.com')
        end

        it 'should render updated user as JSON' do
          expect(response.body).to eq(UserSerializer.new(user.reload).to_json)
        end
      end

      context 'with invalid information' do
        let(:user_params) { FactoryGirl.attributes_for(:user, email: 'change@email') }

        it 'should not update user info' do
          user.reload
          expect(user.email).to eq(@old_email)
          expect(user.email).not_to eq('change@email')
        end

        it 'should render error messages as JSON' do
          expect(response.body).to eq(user.errors.to_json)
        end

        it 'should response with 422 status' do
          expect(response.status).to eq(422)
        end
      end
    end

    context 'not logged in' do
      it_behaves_like 'authenticate'
    end
  end
end
