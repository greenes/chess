Rails.application.routes.draw do
  root to: 'home#index'

  resources :chess_games,  only: [:create, :update, :delete]
end
