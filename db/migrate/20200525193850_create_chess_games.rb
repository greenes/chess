class CreateChessGames < ActiveRecord::Migration[6.0]
  def change
    create_table :chess_games do |t|
      t.string :black_player, null:false
      t.string :white_player, null:false
      t.jsonb :piece_positions, null:false, default:{"d8": "black-queen","e8": "black-king","d1": "white-queen","e1": "white-king","b8": "black-knight","g8": "black-knight","a8": "black-rook","h8": "black-rook","a1": "white-rook","h1": "white-rook","b1": "white-knight","g1": "white-knight","c1": "white-bishop","f1": "white-bishop","c8": "black-bishop","f8": "black-bishop","a7": "black-pawn","b7": "black-pawn","c7": "black-pawn","d7": "black-pawn","e7": "black-pawn","f7": "black-pawn","g7": "black-pawn","h7": "black-pawn","a2": "white-pawn","b2": "white-pawn","c2": "white-pawn","d2": "white-pawn","e2": "white-pawn","f2": "white-pawn","g2": "white-pawn","h2": "white-pawn"}
      t.text :captured_pieces, array:true, default: []
      t.string :turn, null:false, default: "white"

      t.timestamps null:false
    end
  end
end
