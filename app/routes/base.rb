# encoding: utf-8

require 'sinatra/contrib'
require 'sinatra/json'

module Routes
  class Base < Sinatra::Application
    set :erb, :escape_html => true
    set :root, File.expand_path('../../..', __FILE__)
    set :views, 'app/views'
    enable :sessions
    set :session_secret, 'meejia_client'
    set :redis, Redis.new
    set :show_exceptions, :after_handler
    set :raise_errors, :after_handler
    set :public_dir, 'dist'

    configure :dashboard do
      set :show_exceptions, false
    end

    helpers Sinatra::JSON, Sinatra::Contrib

    helpers do
      def stylesheet_link(path)
        %{<link href="#{asset_path(path)}" rel="stylesheet" type="text/css" media="screen">}.html_safe
      end

      def javascript_tag(path)
        %{<script src="#{asset_path(path)}"></script>}.html_safe
      end
    end

    def asset_path(path)
      #key = path.sub(/^\//, '')
      #if settings.use_asset_manifest
      #  File.join('/', asset_manifest.fetch(key))
      #else
        path
      #end
    end

    register Sinatra::Namespace
    protected

    def json_body
      @json_body ||= JSON.parse(request.body.read) rescue {}
    end

    get '/hi' do
      'hello world'
    end

    get '/quick_search' do
      @wechat_user_id = params['wid']
      response = Typhoeus.get("#{MEEHOME_SERVER_URL}/wechat/user/#{@wechat_user_id}/search")
      @search = response.body
      @from_agent = params['from_agent'] || false
      erb :quick_search
    end

    get '/home/:id' do
      response = Typhoeus.get("#{MEEHOME_SERVER_URL}/home/#{params[:id]}")     #todo request agent
      home = JSON.parse response.body
      if params[:agent_id]
        agent = JSON.parse Typhoeus.get("#{MEEHOME_SERVER_URL}/agent/#{params[:agent_id]}/show").body
        @agents = [agent]
      else
        agents = JSON.parse Typhoeus.get("#{MEEHOME_SERVER_URL}/agents").body
        @agents = agents
      end
      @uid = params['uid'] || ''
      erb :home_detail, :locals => home.symbolize_keys
    end

    get '/auth_callback' do
      erb :login_callback, layout: false
    end

    get '/get_home' do
      redirect '/static/get_home.html'
    end

    get '/get_agent' do
      redirect '/static/get_agent.html'
    end

    get '/get_money' do
      redirect '/static/get_money.html'
    end

    post '/metric_tracking' do
      request_payload = JSON.parse request.body.read
      response = Typhoeus.post("#{MEEHOME_SERVER_URL}/user/metric_tracking", headers: {uid: request.env['HTTP_UID'] }, body: request_payload )
      response.body
    end

    private

  end
end
