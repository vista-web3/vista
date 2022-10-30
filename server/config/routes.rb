Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  resource :communities, only: [:create, :destroy, :show]
  resource :users_communities_memberships, only: [:create, :destroy, :update, :show]
end
