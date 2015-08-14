require 'typhoeus'

module Routes
  class Home < Base

    configure :development do
      set :assets_debug, ENV['ASSET_DEBUG'].present?
    end

    get '/' do
      content_type :html
      erb :index
    end

    get '/comments' do
      json [{author: 'Leo Jiang', text: 'React is good'}]
    end

    get '/homeSearch' do
      response = Typhoeus.get("localhost:3032/home", params: params)
      response.body
    end

    get '/regionSearch' do
      response = Typhoeus.get("localhost:3032/region", params: params)
      response.body
    end
  end
end
