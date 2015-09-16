$LOAD_PATH.unshift File.expand_path(File.dirname(__FILE__))
require 'boot'
require 'redis-rack'
require 'app/models'
require 'app/routes'
require 'app/extensions'
require 'app/services'
require 'rack/mount'

module MeHome
  App = Rack::Mount::RouteSet.new do |set|
    set.add_route Routes::Home, :path_info => %r{^/.*$}
    set.add_route Routes::Agent, :path_info => %r{^/.*$}
  end
end