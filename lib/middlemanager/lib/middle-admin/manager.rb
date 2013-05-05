# encoding: UTF-8
require 'psych'
require 'yaml'
require 'yaml/store'
require 'fileutils'
require 'thor'

libdir = File.expand_path(File.dirname(__FILE__))
$LOAD_PATH.unshift(libdir) unless $LOAD_PATH.include?(libdir)

module MiddleManager

  autoload :Server, "server"

  class Store < YAML::Store
    class << self
      def generate_key(name, path)
        "%s@%s" % [path, name]
      end
    end

    def all
      transaction do
        roots.map do |name|
          Thor::CoreExt::HashWithIndifferentAccess.new self[name]
        end
      end
    end

    def get(key)
      transaction do
        Thor::CoreExt::HashWithIndifferentAccess.new self[key]
      end
    end

    def set(key, value)
      transaction do
        self[key] = value
      end
    end

    def delete_key(key)
      transaction do
        self.delete_key(key)
      end
    end
  end

  class Manager
    attr_accessor :regions, :pages

    def initialize(options={})
      @store_dir = options[:store_dir]
      @filename = options[:filename] || 'middle_manager.yml'

      FileUtils.mkdir_p(@store_dir) unless File.exists?(@store_dir)
      @store = Store.new(File.join(@store_dir, @filename))
      @pages_store = Store.new(File.join(@store_dir, 'middle_manager_pages.yml'))
      @regions = Regions.new(@store)
      @pages = Pages.new(@store)

    end

    def mgmt(obj, name, options)
      throw "mgmt: missing `name`" unless name

      path = options.delete(:path)
      throw "mgmt: missing `path`" unless path

      title = options.delete(:title)

      content = { path: path, name: name, value: "{{ mgmt #{name} }}", title: title, options: options }


      # TODO validate key (maybe enforce that only letters, numbers, spaces and underscores allowed for key?)
      # TODO use Store's .get / .set class methods here ...
      obj = @store.transaction do
        @store["%s@%s" % [path, name]] ||= content
      end
      obj = Thor::CoreExt::HashWithIndifferentAccess.new(obj)
      markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML, :autolink => true, :space_after_headers => true)
      html_value = markdown.render(obj.value)
      #obj.value
      html_value
    end
  end

  class Storage
    def initialize(store)
      @store = store
    end

    def all
      @store.all
    end

    def get(key)
      @store.get(key)
    end

    def set(key, value)
      @store.set(key, value)
    end

    def delete_key(key)
      @store.transaction do
        @store.delete(key)
      end
    end
  end

  class Regions < Storage
    def initialize(store)
      super(store)
    end
  end

  class Pages < Storage
    def initialize(store)
      super(store)
    end
  end
end
