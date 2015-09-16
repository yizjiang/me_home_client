require 'typhoeus'

module Routes
  class Agent < Base
    get '/agent/:name' do
      response = Typhoeus.get("#{MEEHOME_SERVER_URL}/agent/#{params[:name]}")
      @data = response.body
      p "xxx #{@data}"
      content_type :html
      erb :agent
    end

    get '/agent/:name/page' do
      response = Typhoeus.get("#{MEEHOME_SERVER_URL}/agent/#{params[:name]}")
      response.body
    end

    post '/save_page_config' do
      request_payload = JSON.parse request.body.read
      response = Typhoeus.post("#{MEEHOME_SERVER_URL}/agent/save_page_config", headers: {user_id: request.env['HTTP_USER_ID'] }, body: request_payload )
      response.body
    end

  end
end