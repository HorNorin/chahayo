class SessionController < ApplicationController
  before_action :authenticate, only: :destroy
  before_action :not_login_check, only: :create

  def create
    if user = User.authenticate(params[:email], params[:password])
      generated_token = AuthenticationToken.instance.generate(user.uuid)
      user_with_token = UserWithToken.new(token: generated_token, user: user)
      render json: user_with_token
    else
      render_invalid_credential
    end
  end

  def destroy
    AuthenticationToken.instance.revoke(token)
    render json: 'Successfully logout.', status: :moved_permanently
  end

  private

  def render_invalid_credential
    render json: 'Bad credential', status: :moved_permanently
  end
end
