class UsersController < ApplicationController
    def index
        users = User.all
        render json: users
    end

    def create

        user = User.new(user_params)
        
        if user.save
            render json: user
        else
            render json: user.errors.full_messages, status: 418
        end
    end

    def show
        # :id = 2
        render json: User.find(params[:id]) #for hardcoding...User.find(2)
    end

    def update
        render json: User.find(params[:id]).update!(user_params)
    end

    def destroy
        render json: User.destroy(params[:id])
    end

    private
    def user_params 
        params.require(:user).permit(:username)
    end

end
