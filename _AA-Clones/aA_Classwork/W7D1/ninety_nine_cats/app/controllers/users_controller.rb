class UsersController < ApplicationController
    before_action :no_go_there_you_are_logged_in_dumb_dumb, only: [:new]
    
    def new
        @user = User.new
        render :new
    end

    def create
        user = User.new(user_params)

        if user.save
            login_user!(user)
            redirect_to cats_url
        else
            render :new
        end
    end

    def user_params
        params.require(:user).permit(:username, :password)
    end
end