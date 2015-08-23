require 'typhoeus'

module Routes
  class Home < Base

    configure :development do
      set :assets_debug, ENV['ASSET_DEBUG'].present?
    end

    get '/clear' do
      session[:uid] = ''
      redirect MEEHOME_SERVER_URL
    end

    get '/uid' do
      session[:uid]
    end

    get '/' do
      session[:uid] = get_user_session unless session[:uid] != ''  #TODO
      p "root #{session[:uid]}"
      content_type :html
      erb :index
    end

    get '/comments' do
      json [{author: 'Leo Jiang', text: 'React is good'}]
    end

    get '/homeSearch' do
      response = Typhoeus.get("#{MEEHOME_SERVER_URL}/home", params: params)
      response.body
    end

    get '/regionSearch' do
      response = Typhoeus.get("#{MEEHOME_SERVER_URL}/region", params: params)
      response.body
    end

    get '/user' do
      if session[:uid] != ''
        response = Typhoeus.get("#{MEEHOME_SERVER_URL}/user", params: {uid: session[:uid]})
        response.body
      end
    end

    def get_user_session
      response = Typhoeus.get("#{MEEHOME_SERVER_URL}/session", params: params)
      response.body
    end
  end
end
