APP_CONFIG = YAML.load(ERB.new(File.read('./config/settings.yml')).result)
TRACKING_SOURCE = {
                    "home_search_items" => "we_a",
                    "agent_request_items" => "agt_req",
                    "send_home_card" => "h_c",
                    "agent_send" => "agt_snd",
                    "home_map" => "h_m"
                  }
TRACKING_SOURCE.default = "other"
