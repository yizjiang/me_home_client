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

    post '/' do
      content_type :html
      erb :index
    end

    get '/' do
      content_type :html
      erb :index
    end

  end
end
