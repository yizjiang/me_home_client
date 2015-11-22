require 'typhoeus'

module Routes
  class Home < Base

    configure :development do
      set :assets_debug, ENV['ASSET_DEBUG'].present?
    end

    get '/clear' do
      session[:uid] = ''
      redirect MEEHOME_SERVER_URL + '?user_action=logout'
    end

    get '/uid' do
      session[:uid]
    end

    get '/' do
      session[:uid] = get_user_session if session[:uid].to_s == ''  #TODO
      p "root #{session[:uid]}"
      content_type :html
      erb :index
    end

    get '/comments' do
      json [{text: 'Where to buy'}]
    end

    get '/homeSearch' do
      response = Typhoeus.get("#{MEEHOME_SERVER_URL}/home", params: params)
      response.body
    end

    get '/regionSearch' do
      response = Typhoeus.get("#{MEEHOME_SERVER_URL}/region", params: params)
      response.body
    end

    post '/saveSearch' do
      request_payload = JSON.parse request.body.read
      response = Typhoeus.post("#{MEEHOME_SERVER_URL}/user/save_search", headers: {user_id: request.env['HTTP_USER_ID'] }, body: request_payload )
      response.body
    end

    delete '/removeSearch/:id' do
      response = Typhoeus.delete("#{MEEHOME_SERVER_URL}/user/remove_search/#{params[:id]}" )
      response.body
    end

    post '/unfavoriteHome' do
      request_payload = JSON.parse request.body.read
      response = Typhoeus.post("#{MEEHOME_SERVER_URL}/user/unfavorite_home", headers: {user_id: request.env['HTTP_USER_ID'] }, body: request_payload )
      response.body
    end

    post '/favoriteHome' do
      request_payload = JSON.parse request.body.read
      response = Typhoeus.post("#{MEEHOME_SERVER_URL}/user/favorite_home", headers: {user_id: request.env['HTTP_USER_ID'] }, body: request_payload )
      response.body
    end


    post '/submitQuestion' do
      request_payload = JSON.parse request.body.read
      response = Typhoeus.post("#{MEEHOME_SERVER_URL}/user/submit_question", headers: {user_id: request.env['HTTP_USER_ID'] }, body: request_payload )
      response.body
    end

    post '/post_answer' do
      request_payload = JSON.parse request.body.read
      response = Typhoeus.post("#{MEEHOME_SERVER_URL}/question/post_answer", headers: {user_id: request.env['HTTP_USER_ID'] }, body: request_payload )
      response.body
    end

    get '/home/show' do
      response = Typhoeus.get("#{MEEHOME_SERVER_URL}/home/#{params[:home_id]}")
      response.body
    end

    get '/user' do
      if session[:uid] != ''
        response = Typhoeus.get("#{MEEHOME_SERVER_URL}/user", params: {uid: session[:uid]})
        response.body
      end
    end

    get '/questions' do
      response = Typhoeus.get("#{MEEHOME_SERVER_URL}/question",  headers: {user_id: request.env['HTTP_USER_ID'] })
      response.body
    end

    get '/user/questions' do
      response = Typhoeus.get("#{MEEHOME_SERVER_URL}/user/questions",  headers: {user_id: request.env['HTTP_USER_ID'] })
      response.body
    end

    get '/customers' do
      response = Typhoeus.get("#{MEEHOME_SERVER_URL}/customers")
      response.body
    end

    post '/customers/connect' do
      request_payload = JSON.parse request.body.read
      response = Typhoeus.post("#{MEEHOME_SERVER_URL}/customers/connect", headers: {user_id: request.env['HTTP_USER_ID'] }, body: request_payload)
      response.body
    end

    def get_user_session
      response = Typhoeus.get("#{MEEHOME_SERVER_URL}/session", params: params)
      response.body
    end
  end
end
