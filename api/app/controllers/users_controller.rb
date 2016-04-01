class UsersController < ApplicationController
  before_action :authenticate, except: :create
  before_action :not_login_check, only: :create

  def show
    render json: UserWithToken.new(token: token, user: current_user)
  end

  def create
    @user = User.new(user_params)
    render_user_errors and return unless @user.save
    generated_token = AuthenticationToken.instance.generate(@user.uuid)
    render json: UserWithToken.new(token: generated_token, user: @user)
  end

  def update
    uuid = AuthenticationToken.instance.uuid(token)
    @user = User.find_by(uuid: uuid)
    render_user_errors and return unless @user.try(:update_attributes, user_params)
    render json: @user
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end

  def render_user_errors
    render json: @user.errors, status: :unprocessable_entity
  end
end
