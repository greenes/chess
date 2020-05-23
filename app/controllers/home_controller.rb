class HomeController < ApplicationController
	def index
    @turn = { turn: "White" }
	end
end