class ChessGamesController < ApplicationController
  
  skip_before_action :verify_authenticity_token

  def create
    @chess_game = ChessGame.new(chess_game_params)
    if @chess_game.save
      return render json: @chess_game.to_json, status: :created, location: chess_game_url(@chess_game)
    else
      return render json: @chess_game.errors, status: :unprocessable_entity
    end

  end

  def update
    puts "WERE HERE AND WERE UPDATING"
    puts chess_game_params
    @chess_game = ChessGame.find_by_id(params[:id])

    if @chess_game.update(chess_game_params)
      return render json: @chess_game.to_json, status: :ok, location: chess_game_url(@chess_game)
    else
      return render json: @chess_game.errors, status: :unprocessable_entity
    end

  end

  def destroy
    @chess_game = chess_game.find_by_id(params[:id])
    @chess_game.destroy

    return head :no_content
  end

  private

  def chess_game_params
    params.require(:chess_game).permit(:id, :turn, :piece_positions => {}, :captured_pieces => [])
  end

end