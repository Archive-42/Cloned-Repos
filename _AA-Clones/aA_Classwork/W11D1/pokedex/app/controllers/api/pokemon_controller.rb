class Api::PokemonController < ApplicationController

  def index
     @pokemon = Pokemon.all
    #  render json: @pokemon
  end

  def show
    @poke = Pokemon.find(params[:id])
    # render json: @poke
  end

end
