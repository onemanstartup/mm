# ok already
require 'middle_admin'
require 'fastimage'
require 'json'

#activate :blog do |blog|
  #blog.paginate = true
  #blog.page_link = "p:num"
  #blog.per_page = 20
  #blog.sources = "blog/:year-:month-:day-:title"
#end

#require "source/lib/custom_helpers"
#helpers CustomHelpers
helpers do
  def magic_link_to(*args, &block)
    if "/" + request.path == args[0]
      args[1] = {}
      args[1][:class] = "current"
    end
    link_to(*args, &block)
  end
end
class Image
  attr_accessor :image_name, :axis, :bg, :range_row, :range_col, :letter_box_type, :width, :height
  def initialize(image_name, h=nil)
    if h
      self.axis = h[:axis] || ""
      self.bg = h[:bg]   ||  "ffffff"
      self.range_row = h[:range_row] ||  "0, 0"
      self.range_col = h[:range_col] ||  "0, 0"
      self.letter_box_type = h[:letter_box_type] ||  ""
    end
    self.image_name = image_name
    self.width =  FastImage.size("source/images/works/" + image_name)[0] 
    self.height =  FastImage.size("source/images/works/" + image_name)[1] 
  end
  
  def to_json(*a)
    {
      "json_class"   => self.class.name,
      "data"         => {"image_name" => self.image_name, "width" => self.width, "height" => self.height}
    }.to_json(*a)
  end
end
class Work
  
  attr_accessor :title, :images, :ru_title, :preview
  def initialize(title, ru_title="")
    self.title = title
    self.ru_title = ru_title
    self.images = []
  end
  
  def add_image( image_name, h={} )
    @image = Image.new(image_name, h)
    self.images << @image
  end
  
  def add_preview( image_name )
    @image = Image.new(image_name)
    self.preview = @image
  end
  
  def to_json(*a)
    {
      "json_class"   => self.class.name,
      "data"         => {"title" => self.title, "ru_title" => self.ru_title, "images" => self.images, "preview" => self.preview}
    }.to_json(*a)
  end
 
  
end
#works = []
#w1 = Work.new("Work #1")
#w1.add_image("31_pixel_art.png", {:axis=>"x", :bg => "fff6eb", :letter_box_type=>"full"})
#works << w1
#w2 = Work.new("Work #2")
#w2.add_image("39_pixel_art.png")
#works << w2
#w3 = Work.new("Work #3")
#w3.add_image("29_pixel_art.png", {:axis=>"x", :letter_box_type=>"full"})
#works << w3

    # if viewport.width > image.width
    #   center & vertical & bg
    # if viewport.width < image.width
    #   horizontal scrolling & bg
    # if viewport.height < image.height
    #   viewport.height = 50%
    #   
    

# Works
ignore "work_template.html"
ignore "ru/work_template.html"

@manager_pages_works ||= MiddleManager::Manager.new(store_dir:'data/', filename:'middle_manager_pages.yml')
@works = @manager_pages_works.pages.all
@works_array = []
@works.each_with_index do |work, index|
  if work.category == "work"
    w = Work.new(work.title, work.ru_title)
    if work.images != nil
      work.images.each do |h, image|
          w.add_image(image["image_name"], {:axis=>image["axis"], :letter_box_type=>image["letter_box_type"], :bg => image["bg"]})
          if w.images.length == 1
            puts w.inspect
            w.add_preview("pre_"+image["image_name"])
            puts "ok"
          end
      end
    end
    @works_array << w
  end
end

@works_array.each_with_index do |work, index|
  page "/gallery/pixelart_#{index+1}.html", :proxy => "/localizable/index.html", :ignore => true do
    @title = work.title
    @images = work.images
  end
  page "ru/gallery/pixelart_#{index+1}.html", :proxy => "/localizable/index.html", :ignore => true do
    @title = work.ru_title
    @images = work.images
  end
end


# Pages
#
#@manager_pages ||= MiddleManager::Manager.new(store_dir:'data/', filename:'middle_manager_pages.yml')
#@pages = @manager_pages.pages.all
#@pages.each_with_index do |work, index|
  #page "/post/#{index}.html", :proxy => "/localizable/post_template.html", :ignore => true do
    #@title = work.title
  #end
#end

#page_articles = @pages
#articles = @pages
page "/about.html", :proxy => "/localizable/index.html"
page "ru/about.html", :proxy => "/localizable/index.html"
page "/ru/", :proxy => "/localizable/index.html"

ignore /^data.+/
ignore /^feed.+/
ignore /^tag.+/
### 
# Compass
###

# Susy grids in Compass
# First: gem install compass-susy-plugin
# require 'susy'

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
# 
# With no layout
# page "/path/to/file.html", :layout => false
# 
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
# 
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy (fake) files
# page "/this-page-has-no-template.html", :proxy => "/template-file.html" do
#   @which_fake_page = "Rendering a fake page with a variable"
# end

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end
activate :i18n, :langs => [:en, :ru]
activate :sprockets
after_configuration do
  AutoprefixerRails.install(sprockets)
end

set :debug_assets, true
set :css_dir, 'stylesheets'
#set :logging, true
set :js_dir, 'js'

set :images_dir, 'images'
activate :livereload

#activate :livereload
activate :admin
# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
   activate :minify_css
    # Minify Javascript on build
   activate :minify_javascript
  
  # Enable cache buster
   activate :cache_buster
  
  # Use relative URLs
  # activate :relative_assets
  
  # Compress PNGs after build
  # First: gem install middleman-smusher
  # require "middleman-smusher"
  # activate :smusher
  
  # Or use a different image path
  # set :http_path, "/Content/images/"
end
