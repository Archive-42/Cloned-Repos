class PostsController < ApplicationController
  def new
    @post = Post.new
    render :new
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      redirect_to post_url(@post)
    else
      flash.now[:errors] = "Victoria...don forget to say goodbye"
      render :new 
    end
  end

  def show
    @post = Post.find_by(id: params[:id])
    render :show
  end

  def edit
    @post = current_user.posts.find_by(id: params[:id])
    render :edit
  end

  def update
    @post = current_user.posts.find_by(id: params[:id])
    if @post 
      @post.update(post_params)
      redirect_to post_url(@post)
    else
      flash.now[:errors] = "Victoria likes to dance"
      render :edit 
    end

  end

  def destroy
    @post = current_user.posts.find_by(id: params[:id])
    @post.delete
    render :index
  end

  def post_params
    params.require(:post).permit(:title, :content, :url)
  end
end
