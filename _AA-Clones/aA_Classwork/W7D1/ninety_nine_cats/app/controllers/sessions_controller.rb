class SessionsController < ApplicationController
    before_action :no_go_there_you_are_logged_in_dumb_dumb, only: [:new]

    def new
        render :new
    end

    def create
        user = User.find_by_credentials(
            params[:user][:username],
            params[:user][:password]
        )

        if user
            login_user!(user)
            redirect_to cats_url
        else
            render :new
        end
    end

    def destroy
        return unless logged_in?
        current_user.reset_session_token!
        session[:session_token] = nil
        redirect_to new_session_url
    end
end
