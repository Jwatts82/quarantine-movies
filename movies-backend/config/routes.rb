Rails.application.routes.draw do
  resources :movies
  resources :categories
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  

  #resources :categories, only: [:index, :create, :show] do
  # resources :movies, only: [:show, :destroy, :create]
  #end

end