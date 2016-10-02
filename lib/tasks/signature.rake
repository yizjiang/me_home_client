require('typhoeus')
require 'digest/sha1'
require 'json'

namespace :wechat do
  task :signature do
    response = Typhoeus.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx18034235da4be445&secret=64007b6d52d74fb2858ea90e28f8cd1b')
    token = JSON.parse(response.body)['access_token']
    response = Typhoeus.get("https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=#{token}&type=jsapi")
    ticket =  JSON.parse(response.body)['ticket']
    string1 = "jsapi_ticket=#{ticket}&noncestr=leojyz&timestamp=1471594625&url=http://65c4ff6f.ngrok.io/game"
    p Digest::SHA1.hexdigest string1
  end
end