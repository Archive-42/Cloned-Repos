class UsersController < ApplicationController
  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to users_url
    else
      flash.now[:errors] = ['Incorrect username and password']
      render :new
    end
  end

  def index
    @user = User.all 
    render :index
  end

  def user_params
    params.require(:user).permit(:username, :password)
  end

  def show
    @user = User.find_by(id: params[:id])
    # render :show
    render json: @user
  end

  def edit 
     @user = User.find_by(id: params[:id])
     render :edit
  end

  def update
    @user = User.find_by(id: params[:id])
    if @user.update(user_params)
      redirect_to edit_user_url(@user)
      # render json: @user
    else
      flash.now[:errors] = ['Incorrect username and password']
      render :edit
      # render json: @user
    end
  end

  def destroy
    @user = User.find_by(id: params[:id])
    @user.delete
    redirect_to users_url
  end

end
