require 'middleman-middlemanager'
require 'fastimage'
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

class Work
  
  attr_accessor :title, :images
  def initialize(title)
    self.title = title
    self.images = []
  end
  
  def add_image( image_name, h={} )
    h[:axis] ||= ""
    h[:bg]   ||= "ffffff"
    h[:range_row] ||= "0, 1000"
    h[:range_col] ||= "0, 1000"
    h[:letter_box_type] ||= ""
    @image = {
        :image_name => image_name,
        :width => FastImage.size("source/images/works/" + image_name)[0],
        :height => FastImage.size("source/images/works/" + image_name)[1],
    }
    @image.merge!(h)
    self.images << @image
  end
  

end
works = []
w1 = Work.new("Work #1")
w1.add_image("31_pixel_art.png", {:axis=>"x", :bg => "fff6eb", :letter_box_type=>"full"})
works << w1
w2 = Work.new("Work #2")
w2.add_image("39_pixel_art.png")
works << w2
w3 = Work.new("Work #3")
w3.add_image("29_pixel_art.png", {:axis=>"x", :letter_box_type=>"full"})
works << w3

    # if viewport.width > image.width
    #   center & vertical & bg
    # if viewport.width < image.width
    #   horizontal scrolling & bg
    # if viewport.height < image.height
    #   viewport.height = 50%
    #   
    


works.each_with_index do |work, index|
  page "/works/#{index}.html", :proxy => "/localizable/work_template.html", :ignore => true do
    @title = work.title
    @images = work.images
  end
end


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

set :css_dir, 'stylesheets'

set :js_dir, 'js'

set :images_dir, 'images'
activate :livereload
activate :middle_manager
# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  # activate :minify_css
    # Minify Javascript on build
  # activate :minify_javascript
  
  # Enable cache buster
  # activate :cache_buster
  
  # Use relative URLs
  # activate :relative_assets
  
  # Compress PNGs after build
  # First: gem install middleman-smusher
  # require "middleman-smusher"
  # activate :smusher
  
  # Or use a different image path
  # set :http_path, "/Content/images/"
end
