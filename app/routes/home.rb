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
      @wid = params['wid'] || ''
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
      response = Typhoeus.post("#{MEEHOME_SERVER_URL}/user/save_search", headers: {uid: request.env['HTTP_UID'] }, body: request_payload )
      response.body
    end

    delete '/removeSearch/:id' do
      response = Typhoeus.delete("#{MEEHOME_SERVER_URL}/user/remove_search/#{params[:id]}" )
      response.body
    end

    post '/unfavoriteHome' do
      request_payload = JSON.parse request.body.read
      response = Typhoeus.post("#{MEEHOME_SERVER_URL}/user/unfavorite_home", headers: {uid: request.env['HTTP_UID'] }, body: request_payload )
      response.body
    end

    post '/favoriteHome' do
      request_payload = JSON.parse request.body.read
      response = Typhoeus.post("#{MEEHOME_SERVER_URL}/user/favorite_home", headers: {uid: request.env['HTTP_UID'] }, body: request_payload )
      response.body
    end


    post '/submitQuestion' do
      request_payload = JSON.parse request.body.read
      response = Typhoeus.post("#{MEEHOME_SERVER_URL}/user/submit_question", headers: {uid: request.env['HTTP_UID'] }, body: request_payload )
      response.body
    end

    post '/post_answer' do
      request_payload = JSON.parse request.body.read
      response = Typhoeus.post("#{MEEHOME_SERVER_URL}/question/post_answer", headers: {uid: request.env['HTTP_UID'] }, body: request_payload )
      response.body
    end

    get '/home/show' do
      response = Typhoeus.get("#{MEEHOME_SERVER_URL}/home/#{params[:home_id]}", params: {wid: params[:wechat_id]})
      response.body
    end

    get '/user' do
      if (params[:ticket] != nil && params[:ticket] != '') && (session[:uid].nil? && session[:uid] == '')
        session[:uid] =  get_user_session
      end
      if session[:uid] && session[:uid] != ''
        response = Typhoeus.get("#{MEEHOME_SERVER_URL}/user", params: {uid: session[:uid]})
        response.body
      end
    end

    get '/questions' do
      response = Typhoeus.get("#{MEEHOME_SERVER_URL}/question",  headers: {uid: request.env['HTTP_UID'] })
      response.body
    end

    get '/user/questions' do
      response = Typhoeus.get("#{MEEHOME_SERVER_URL}/user/questions",  headers: {uid: request.env['HTTP_UID'] })
      response.body
    end

    get '/customers' do
      response = Typhoeus.get("#{MEEHOME_SERVER_URL}/customers")
      response.body
    end

    post '/customers/connect' do
      request_payload = JSON.parse request.body.read
      response = Typhoeus.post("#{MEEHOME_SERVER_URL}/customers/connect", headers: {uid: request.env['HTTP_UID'] }, body: request_payload)
      response.body
    end

    def get_user_session
      response = Typhoeus.get("#{MEEHOME_SERVER_URL}/session", params: params)
      response.body
    end
  end
end
