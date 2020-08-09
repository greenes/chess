class HomeController < ApplicationController
	def index
		@game = ChessGame.last
		@props = {
			gameId: @game.id,
			turn: @game.turn,
			piecePositions: @game.piece_positions,
			capturedPieces: @game.captured_pieces,
			pastMoves: @game.past_moves
		}
	end
end