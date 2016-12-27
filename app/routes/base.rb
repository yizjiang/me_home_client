# encoding: utf-8

require 'sinatra/contrib'
require 'sinatra/json'
require 'csv'

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

    error do
      send_file '500.html'
    end

    get '/hi' do
      'hello world'
    end

    get '/qa' do
      CSV.read('./config/qa.csv').to_json   
    end
    
    get '/tutorial' do
      erb :home_tutorial_qa
    end

    get '/game' do
      @uid = '4cdee2ddfd082da8414336c621584126' #SecureRandom.hex
      erb :home_game
    end

    get '/region_tutorial' do
      @uid = params[:uid] || ''
      erb :region_tutorial
    end


    get '/check_login' do
      response = Typhoeus.get("#{MEEHOME_SERVER_URL}/check_login", params: {uid: params[:uid]})
      response.body
    end

    post '/qr_code' do
      #response = Typhoeus.post("#{MEEHOME_SERVER_URL}/qr_code", body: {uid: params[:uid]})
      #response.body
      {url: 'http://localhost:3032/agents/login_4cdee2ddfd082da8414336c621584126.png'}.to_json
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
        @agents = JSON.parse Typhoeus.get("#{MEEHOME_SERVER_URL}/agents").body
      end
      @listing_agent = home['listing_agent'].merge(listed_by: home['listed_by'])
      if home['listing_agent'] && @agents.length > 1
        @agents= @agents.delete_if{|agent| agent['agent_id'] == home['listing_agent']['id']}
      end
      @uid = params['uid'] || ''
      erb :home_detail, :locals => home.symbolize_keys
    end

    get '/commercial/:id' do
      response = Typhoeus.get("#{MEEHOME_SERVER_URL}/commercial/#{params[:id]}")     #todo request agent
      commercial = JSON.parse response.body

      if params[:agent_id]
        agent = JSON.parse Typhoeus.get("#{MEEHOME_SERVER_URL}/agent/#{params[:agent_id]}/show").body
        @agents = [agent]
      else
        @agents = JSON.parse Typhoeus.get("#{MEEHOME_SERVER_URL}/agents").body
      end
      @uid = params['uid'] || ''
      erb :commercial_detail, :locals => commercial.symbolize_keys
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

    get '/article/:id' do
      response = Typhoeus.get("#{MEEHOME_SERVER_URL}/article/#{params[:id]}")
      response.body
    end

    get '/meemap' do
      response = Typhoeus.get("#{MEEHOME_SERVER_URL}/all_schools")
      @schools = response.body
      erb :meehome_map
    end

    post '/metric_tracking' do
      request_payload = JSON.parse request.body.read
      response = Typhoeus.post("#{MEEHOME_SERVER_URL}/user/metric_tracking", headers: {uid: request.env['HTTP_UID'] }, body: request_payload )
      response.body
    end

    post '/metric/house_view' do
      response = Typhoeus.post("#{MEEHOME_SERVER_URL}/user/metric_tracking_h", headers: {uid: request.env['HTTP_UID'] }, body: params.to_query )
      200
    end

    get '/metric/home/:hid' do
      params.delete("splat")
      params.delete("captures")
      response = Typhoeus.post("#{MEEHOME_SERVER_URL}/user/metric_tracking_h", headers: {uid: params["uid"]||""}, body: params.to_query)
      redirect "/home/#{params['hid']}" + "?" + params.to_query
    end

    get '/metric/user_house_view/:id' do
      response = Typhoeus.get("#{MEEHOME_SERVER_URL}/metric/user/#{params[:id]}/house_viewed")
      @results = JSON.parse response.body
      @max = @results.max_by{|k, v| v["view_times"].to_i}[1] rescue @max = {"geo_point"=>"37.75190734863281,-122.42798614501953"}
      erb :user_view_details
    end

    get '/metric/user_viewed_stats' do
      response = Typhoeus.get("#{MEEHOME_SERVER_URL}/metric/home_view_list")
      @results = JSON(response.body)
      erb :user_view_list
    end

    get '/metric/house_viewed_stats' do
      response = Typhoeus.get("#{MEEHOME_SERVER_URL}/metric/house_list")
      re = JSON.parse response.body
      @results = []
      re.sort_by{|k,v| v["total"]}.reverse.each do |x|
        h = {}
        h["id"] = x[0]
        h["total"] = x[1]["total"]
        h["details"] = {}
        x[1].each do |m, n|
          case m
          when "total"
          when "h_m"
            h["details"]["地图看房"] = n
          when "we_a"
            h["details"]["微信文章"] = n
          when "h_g"
            h["details"]["换房游戏"] = n
          when "h_c"
            h["details"]["房名片"] = n
          when "other"
            h["details"]["其他"] = n
          else
            h["details"][m] = n
          end
        end
        @results << h
      end
      erb :house_viewed_stats
    end

    private

  end
end
