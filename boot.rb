ENV['RACK_ROOT'] = File.expand_path(File.dirname(__FILE__))
ENV['RACK_ENV'] ||= 'development'

$LOAD_PATH.unshift File.join(ENV['RACK_ROOT'], '/lib')

require 'bundler'
Bundler.setup

require 'sinatra/base'
require 'sinatra/namespace'
require 'active_support'
require 'active_support/core_ext'
require 'logger'
require 'redis'
require 'yaml'
require 'erb'

Dir["config/initializers/*.rb"].sort.each do |initializer_file|
  require(initializer_file)
end
