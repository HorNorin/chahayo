Rails.application.routes.draw do
  root 'static#index'

  engine_domain = ExtEngine.name.split(':')[0].downcase
  scope subdomain: engine_domain do
    mount ExtEngine => '/'
  end
end
