class BoardsController < ApplicationController
  def index
    render json: { boards: Board.group(:kind) }
  end
end
