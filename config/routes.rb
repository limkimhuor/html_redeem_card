Rails.application.routes.draw do
  root "static_pages#home"
  get 'static_pages/home'
  get "/show_card", to: "static_pages#show_card"
  get "/survey", to: "survey_page#show_survey"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
