# == Route Map
#
#                     Prefix Verb   URI Pattern                                                                              Controller#Action
#                       cats GET    /cats(.:format)                                                                          cats#index
#                            POST   /cats(.:format)                                                                          cats#create
#                    new_cat GET    /cats/new(.:format)                                                                      cats#new
#                   edit_cat GET    /cats/:id/edit(.:format)                                                                 cats#edit
#                        cat GET    /cats/:id(.:format)                                                                      cats#show
#                            PATCH  /cats/:id(.:format)                                                                      cats#update
#                            PUT    /cats/:id(.:format)                                                                      cats#update
# approve_cat_rental_request POST   /cat_rental_requests/:id/approve(.:format)                                               cat_rental_requests#approve
#    deny_cat_rental_request POST   /cat_rental_requests/:id/deny(.:format)                                                  cat_rental_requests#deny
#        cat_rental_requests POST   /cat_rental_requests(.:format)                                                           cat_rental_requests#create
#     new_cat_rental_request GET    /cat_rental_requests/new(.:format)                                                       cat_rental_requests#new
#                      users POST   /users(.:format)                                                                         users#create
#                   new_user GET    /users/new(.:format)                                                                     users#new
#                new_session GET    /session/new(.:format)                                                                   sessions#new
#                    session DELETE /session(.:format)                                                                       sessions#destroy
#                            POST   /session(.:format)                                                                       sessions#create
#                       root GET    /                                                                                        redirect(301, /cats)
#         rails_service_blob GET    /rails/active_storage/blobs/:signed_id/*filename(.:format)                               active_storage/blobs#show
#  rails_blob_representation GET    /rails/active_storage/representations/:signed_blob_id/:variation_key/*filename(.:format) active_storage/representations#show
#         rails_disk_service GET    /rails/active_storage/disk/:encoded_key/*filename(.:format)                              active_storage/disk#show
#  update_rails_disk_service PUT    /rails/active_storage/disk/:encoded_token(.:format)                                      active_storage/disk#update
#       rails_direct_uploads POST   /rails/active_storage/direct_uploads(.:format)                                           active_storage/direct_uploads#create

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :cats, except: :destroy
  resources :cat_rental_requests, only: [:new, :create] do
    member do
      post :approve
      post :deny
    end
  end

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  root to: redirect('/cats')
end
