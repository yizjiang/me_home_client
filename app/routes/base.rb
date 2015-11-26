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

    get '/auth_callback' do
      erb :login_callback, layout: false
    end

    private

  end
end
