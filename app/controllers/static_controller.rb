class StaticController < ApplicationController
  def index
    render file: 'public/index'
  end
end
