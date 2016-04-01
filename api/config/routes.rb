Api::Engine.routes.draw do
  post 'login'  => 'session#create'
  get  'logout' => 'session#destroy'

  resource :user, only: [:show, :create, :update]
end
