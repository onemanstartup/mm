require "middleman-core"
require "rubygems"
require "bundler"
Bundler.require 

require 'sinatra'
require 'sinatra/contrib/all'

require "middle-admin/manager"

module MiddleManager
  class << self
    def registered(app)
      app.send :map, "/admin" do

        ::MiddleManager::Server.set :middle_manager_data_dir, 'data'
        use Rack::MethodOverride
        run ::MiddleManager::Server

      end
      app.send :include, InstanceMethods
    end
    alias :included :registered
  end

  module InstanceMethods
    # helper methods
    def mgmt(name, options={})

      options[:path] ||= self.request.path

      if data.page.title
        options[:title] = data.page.title
      end

      # HACK create the _middle_manager_instance because I can't figure out how to access `data_dir` earlier
      _middle_manager_instance = ::MiddleManager::Manager.new(store_dir:'data', filename:'middle_manager.yml')
      _middle_manager_instance.mgmt(self, name, options)
    end
  end
end

::Middleman::Extensions.register(:admin, ::MiddleManager)
