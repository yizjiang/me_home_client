require 'typhoeus'

module Routes
  class Agent < Base
    get '/agents' do
      response = Typhoeus.get("#{MEEHOME_SERVER_URL}/agents", headers: {uid: request.env['HTTP_UID'] })
      response.body
    end

    get '/agent/:name' do
      response = Typhoeus.get("#{MEEHOME_SERVER_URL}/agent/#{params[:name]}")
      @data = response.body
      content_type :html
      erb :agent
    end

    get '/agent/:name/page' do
      response = Typhoeus.get("#{MEEHOME_SERVER_URL}/agent/#{params[:name]}")
      response.body
    end

    post '/save_page_config' do
      request_payload = JSON.parse request.body.read
      response = Typhoeus.post("#{MEEHOME_SERVER_URL}/agent/save_page_config", headers: {uid: request.env['HTTP_UID'] }, body: request_payload )
      response.body
    end

    post '/agent/upload_qrcode' do
      filename = params[:file][:filename]
      tempfile = params[:file][:tempfile]
      target = "./#{filename}"

      #File.open(target, 'wb') {|f| f.write tempfile.read }

      response = Typhoeus.post("#{MEEHOME_SERVER_URL}/agent/upload_qrcode",
                               headers: {'Content-Type' => 'multipart/form-data', uid: request.env['HTTP_UID'] },
                               body: {:file => File.open(tempfile,'r')})
      response.body
    end

    get '/agent/:uid/customers' do
      response = Typhoeus.get("#{MEEHOME_SERVER_URL}/agent/#{params[:uid]}/customers")
      response.body
    end

    post '/agent/save_customer_search' do
      request_payload = JSON.parse request.body.read
      response = Typhoeus.post("#{MEEHOME_SERVER_URL}/agent/save_customer_search", headers: {uid: request.env['HTTP_UID'] }, body: request_payload )
      response.body
    end
  end
end