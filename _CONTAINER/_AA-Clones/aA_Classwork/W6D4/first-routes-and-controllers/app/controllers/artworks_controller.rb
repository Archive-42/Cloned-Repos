class ArtworksController < ApplicationController
    def index(user_id)
        # render json: Artwork.all
        render json: Artwork.find(user_id)
    end

    def create

        artwork = Artwork.new(artwork_params)
        
        if artwork.save
            render json: artwork
        else
            render json: artwork.errors.full_messages, status: 418
        end
    end

    def show
        # :id = 2
        render json: Artwork.find(params[:id]) #for hardcoding...Artwork.find(2)
    end

    def update
        render json: Artwork.find(params[:id]).update!(artwork_params)
    end

    def destroy
        render json: Artwork.destroy(params[:id])
    end

    private
    def artwork_params 
        params.require(:artwork).permit(:title, :image_url, :artist_id)
    end

end
