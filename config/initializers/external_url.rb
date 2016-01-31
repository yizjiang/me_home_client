RACK_ENV = ENV['RACK_ENV'] || 'development'

server_config = YAML.load(ERB.new(File.read('./config/server_url.yml')).result)[RACK_ENV]

MEEHOME_SERVER_URL = server_config['server_url']
MEEHOME_CLIENT_URL = server_config['client_url']
CDN_URL = server_config['cdn_url']
ASSET_URL =  RACK_ENV == 'development' ? MEEHOME_CLIENT_URL : CDN_URL