require './app'

run Rack::URLMap.new({
  '/' =>  MeHome::App,
})
