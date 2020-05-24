class HomeController < ApplicationController
	def index
    @turn = { turn: "white" }
	end
end