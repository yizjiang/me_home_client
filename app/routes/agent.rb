# encoding: utf-8
require 'typhoeus'

module Routes
  class Agent < Base
    get '/agents' do
      response = Typhoeus.get("#{MEEHOME_SERVER_URL}/agents", headers: {uid: request.env['HTTP_UID'] })
      response.body
    end

    post '/generate_home_qr_code' do
      request_payload = JSON.parse request.body.read
      response = Typhoeus.post("#{MEEHOME_SERVER_URL}/agent/#{request.env['HTTP_UID']}/generate_home_qr_code", body: request_payload )
      response.body
    end

    get '/agent/:name' do
      user_query = ''
      user_query = "?uid=#{params[:uid]}" if params[:uid]
      response = Typhoeus.get("#{MEEHOME_SERVER_URL}/agent/#{params[:name]}#{user_query}")
      body = JSON.parse response.body
      @agent_info = body.delete_if{|k,_| k.to_sym == :home}.symbolize_keys

      content_type :html
      erb :agent
    end

    get '/agent/:name/page' do
      response = Typhoeus.get("#{MEEHOME_SERVER_URL}/agent/#{params[:name]}")
      response.body
    end

    get '/agent/:id/meejia_image' do
      response = Typhoeus.get("#{MEEHOME_SERVER_URL}/agent/#{params[:id]}/meejia_image")
      response.body
    end

    get '/agent/:id/home_list' do
      response = Typhoeus.get("#{MEEHOME_SERVER_URL}/agent/#{params[:id]}/home_list")
      @home_list = JSON.parse response.body
      content_type :html
      erb :home_list
    end

    get  '/agent/:id/setting' do
      @user_id = params[:id]
      response = Typhoeus.get("#{MEEHOME_SERVER_URL}/agent/#{@user_id}/show")
      @extention = JSON.parse response.body
      content_type :html
      erb :agent_setting
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

    get '/agent/:uid/requests' do
      response = Typhoeus.get("#{MEEHOME_SERVER_URL}/agent/#{params[:uid]}/requests")
      response.body
    end

    post '/agent/save_customer_search' do
      request_payload = JSON.parse request.body.read
      response = Typhoeus.post("#{MEEHOME_SERVER_URL}/agent/save_customer_search", headers: {uid: request.env['HTTP_UID'] }, body: request_payload )
      if response.code == 200
        response.body
      else
        status 400
        {}.to_json
      end
    end

    post '/agent/add_customer_search' do
      request_payload = JSON.parse request.body.read
      response = Typhoeus.post("#{MEEHOME_SERVER_URL}/agent/add_customer_search", headers: {uid: request.env['HTTP_UID'] }, body: request_payload )
      if response.code == 200
        response.body
      else
        status 400
        {}.to_json
      end
    end

    post '/agent/contact_request' do
      request_payload = JSON.parse request.body.read
      response = Typhoeus.post("#{MEEHOME_SERVER_URL}/agent/contact_request", headers: {uid: request.env['HTTP_UID'] }, body: request_payload )
      if response.code == 200
        {status: 'ok'}.to_json
      else
        status 400
        {status: 'error'}.to_json
      end
    end

    post '/agent/request_response' do
      request_payload = JSON.parse request.body.read
      response = Typhoeus.post("#{MEEHOME_SERVER_URL}/agent/request_response", headers: {uid: request.env['HTTP_UID'] }, body: request_payload )
      if response.code == 200
        {status: 'ok'}.to_json
      else
        status 400
        {status: 'error'}.to_json
      end
    end

  end
end
