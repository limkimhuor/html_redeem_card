Rails.application.routes.draw do
  root "static_pages#home"
  get "static_pages/home"
  get "/survey", to: "survey_page#show_survey"
  get "*page" => "pages#show"
end
