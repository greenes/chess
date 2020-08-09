class AddPastMovesToChessGames < ActiveRecord::Migration[6.0]
  def change
    add_column :chess_games, :past_moves, :jsonb, null:false, default: []
  end
end
