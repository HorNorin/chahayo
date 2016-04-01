class ApplicationController < ActionController::Base
  protected

  def authenticate
    current_user || render_unauthorized
  end

  def not_login_check
    render json: 'Already logged in.', status: :moved_permanently if current_user
  end

  def render_unauthorized
    render json: 'Access denied', status: :unauthorized
  end

  def token
    authenticate_with_http_token { |token, options| token }
  end

  def current_user
    @user ||= authenticate_with_http_token do |token, options|
      uuid = AuthenticationToken.instance.uuid(token)
      User.find_by(uuid: uuid)
    end
  end
end
