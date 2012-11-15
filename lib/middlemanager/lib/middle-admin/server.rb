require 'psych'
require 'yaml'
require 'yaml/store'
require 'sinatra/base'
require 'thor'

module MiddleManager
  class Server < Sinatra::Base
    configure :production, :development do
      enable :logging
    end

    use Rack::MethodOverride

    set :views, File.join(File.dirname(__FILE__), '..', '..', 'views')

    def manager
      @manager ||= Manager.new(store_dir:settings.middle_manager_data_dir, filename:'middle_manager.yml')
    end
    def manager_pages
      @manager_pages ||= Manager.new(store_dir:settings.middle_manager_data_dir, filename:'middle_manager_pages.yml')
    end

    get '/restart' do
      `touch config.rb`
      erb :index
    end

    get '/regions' do
      @regions = manager.regions.all
      erb :regions
    end

    get '/pages' do
      @pages = manager_pages.pages.all
      erb :pages
    end
    get '/' do
      erb :index
    end

    get '/region*/edit' do |splat|
      @regions = [] << manager.regions.get("#{splat}")
      erb :'regions/edit'
    end

    post '/region' do
      for param in params
        if param.first && param.first.match(/^region_(.+)/)
          key = $1
          value = param.last

          # puts "Editing #{name} to be #{value}"
          manager.regions.set(key, manager.regions.get(key).merge({ value: value }))
        end
      end
      redirect to('/'), 303
    end

    delete '/region*' do |splat|
      manager.pages.delete_key("#{splat}")
      redirect to('/'), 303
    end

    get '/page*/edit' do |splat|
      @pages = [] << manager_pages.pages.get("#{splat}")
      @splat = splat
      erb :'pages/edit'
    end

    get '/pages/new' do
      erb :'pages/new'
    end
    
    post '/page/create' do
      @key = params["page"]["category"]+'@'+params["page"]['name']
      manager_pages.pages.set(@key,  params["page"])
      redirect to('/'), 303
    end

    post '/page' do
      manager_pages.pages.set(params["key"], manager_pages.pages.get(params["key"]).merge(params["page"]))
      redirect to('/'), 303
    end


    delete '/page*' do |splat|
      manager_pages.pages.delete_key("#{splat}")
      redirect to('/'), 303
    end

    get '/build' do
      Middleman::Cli::Build.new.build
      redirect to('/'), 303
    end
  end
end
