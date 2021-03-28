class ApplicationController < ActionController::Base
    helper_method :current_user, :logged_in?, :login_user!
    helper_method :no_go_there_you_are_logged_in_dumb_dumb
    
    def current_user
        @current_user ||= User.find_by(session_token: session[:session_token])
    end

    def logged_in?
        !!current_user
    end

    def login_user!(user)
        session[:session_token] = user.reset_session_token!
    end

    def no_go_there_you_are_logged_in_dumb_dumb
        redirect_to cats_url if logged_in?
    end
end
