class Api::V1::TweetsController < ApplicationController

  def index
    tweets = HTTParty.get('http://api.flutrack.org/?time=7')
    render json: tweets.parsed_response.sample
  end
end
