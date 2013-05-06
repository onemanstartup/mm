require 'psych'
require 'yaml'
require 'yaml/store'
require 'sinatra'
require 'sinatra/contrib/all'
require 'thor'
require 'git'

module MiddleManager
  class Server < Sinatra::Base
    register Sinatra::Contrib
    enable :logging
    configure :production, :development do
      
    end
    use Rack::MethodOverride
    set :root, File.join(File.dirname(__FILE__), '..', '..')
    #set :public_folder, Proc.new { File.join(root, "public") }
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

    get '/stop' do
      `passenger-memory-stats`.each_line do |line|
        next unless line =~ /#{Dir.pwd}/

        pid, memory_usage =  extract_stats(line)
        Process.kill('TERM',pid)
      end
    end
  # Extract pid and memory usage of a single Passenger
  def extract_stats(line)
    stats = line.split
    return stats[0].to_i, stats[3].to_f
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
        manager.regions.set(key, manager.regions.get(key).merge({ value: value}))
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
    ::Middleman::Cli::Build.new.build
    redirect to('/'), 303
  end

  get '/commit' do
    g = ::Git.open(File.join(File.dirname(__FILE__), '..', '..', '..', '..'), :log => Logger.new(STDOUT))
    g.commit_all('changes from admin') 
    g.push
    redirect to('/'), 303
  end

  post '/upload' do
    file = params[:file]
    filename = file[:filename]
    tempfile = file[:tempfile]
    FileUtils.mkdir_p 'source/images/' + params[:folder]
    FileUtils.mv tempfile.path, "source/images/"+params[:folder]+"/#{filename}"
    redirect '/admin'
  end
end
end
