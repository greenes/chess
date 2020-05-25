# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_05_25_193850) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "chess_games", force: :cascade do |t|
    t.string "black_player", null: false
    t.string "white_player", null: false
    t.jsonb "piece_positions", default: {"a1"=>"white-rook", "a2"=>"white-pawn", "a7"=>"black-pawn", "a8"=>"black-rook", "b1"=>"white-knight", "b2"=>"white-pawn", "b7"=>"black-pawn", "b8"=>"black-knight", "c1"=>"white-bishop", "c2"=>"white-pawn", "c7"=>"black-pawn", "c8"=>"black-bishop", "d1"=>"white-queen", "d2"=>"white-pawn", "d7"=>"black-pawn", "d8"=>"black-queen", "e1"=>"white-king", "e2"=>"white-pawn", "e7"=>"black-pawn", "e8"=>"black-king", "f1"=>"white-bishop", "f2"=>"white-pawn", "f7"=>"black-pawn", "f8"=>"black-bishop", "g1"=>"white-knight", "g2"=>"white-pawn", "g7"=>"black-pawn", "g8"=>"black-knight", "h1"=>"white-rook", "h2"=>"white-pawn", "h7"=>"black-pawn", "h8"=>"black-rook"}, null: false
    t.text "captured_pieces", default: [], array: true
    t.string "turn", default: "white", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
