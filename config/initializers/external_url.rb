RACK_ENV ||= 'development'

server_config = YAML.load(ERB.new(File.read('./config/server_url.yml')).result)[RACK_ENV]

MEEHOME_SERVER_URL = server_config['server_url']
