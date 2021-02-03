class SubsController < ApplicationController
  before_action :require_logged_in, except: [:index, :show]

  def new
    @sub = Sub.new
    render :new 
    # render json: @sub
  end

  def index
    @subs = Sub.all
    render :index
    # render json: @sub
  end

  def show           
    @sub = Sub.find_by(id: params[:id])
    render :show
    # render json: @sub
  end

  def create
    @sub = Sub.new(sub_params)
    if @sub.save
      redirect_to subs_url
    else
      flash.now[:errors] = "Get it right bro"
      render :new
    end
  end

  def edit 
    @sub = current_user.subs.find_by(id: params[:id])
    render :edit
  end

  def update
    @sub = current_user.subs.find_by(id: params[:id])

    if @sub 
      @sub.update(sub_params)
      redirect_to sub_url(@sub)
    else
      flash.now[:errors] = 'Get your shit right bromie/sister/brother'
      render :edit
    end
  end

  def destroy
    @sub = current_user.find_by(id: params[:id])
    @sub.delete
    render :index
  end

  def sub_params
    params.require(:sub).permit(:title, :description)
  end

end
