# MiddleManager
## A Mostly Powerless Little Content Manager For Static Sites

The MiddleManager is a very tiny content manager for static sites. It doesn't need a database – instead, it serializes your edits to a single YAML file. It provides a little helper method (`mgmt`) you can use to indicate which regions of your template you want to manage. Then – once content has been entered in the simple Admin UI – those `mgmt` calls will output the content you want, right where you want it.

### Features
- Easy integration with existing templates – just add `<%= mgmt("Content") %>`!
- Local Admin UI for quick, simple editing
- Serializes all edits to a single YAML file (no database required)
- Middleman extension included: a simple local editing option for static Middleman sites

### Installing

    $ git clone git://github.com/audionerd/middlemanager.git

For MiddleManager

    $ bundle
    $ gem build middleman.gemspec
    $ gem install middleman*.gem

For the Middleman extension/helper:

    $ cd contrib/middleman-middlemanager
    $ gem build middleman-middlemanager.gemspec
    $ gem install middleman-middlemanager*.gem

### Integrating with Middleman

`Middleman::Extensions::MiddleManager` is just a small shim that invites the MiddleManager to the party.

Add it to your Middleman project's `Gemfile`:

    gem 'middleman-middlemanager'

And add it to your Middleman project's `config.rb`:

    require 'middleman-middlemanager'
    activate :middle_manager

And example of this is found in `fixtures/middle-managed-app`.

### How Does It Work?

MiddleManager provides a `mgmt` helper, which you can use in your templates to describe editable content areas ("regions"). For example, in ERB you'd do this:

    <h3><%= mgmt "Headine" %></h3>
    <p><%= mgmt "Description" %></p>

When you visit a page where new regions are defined, that triggers the MiddleManager to do his thing.

<blockquote>
  “Yeah, so if you could go ahead and ... be ... editable, from now on? That'd be greeeeeaattt …”
  <small><cite>– The MiddleManager</cite></small>
</blockquote>

OK, now you can jump into the Admin UI to edit those regions. (If you're running the Middleman extension, you'll find it at `http://localhost:4567/admin`)

Once you've edited the "Headline" and "Description" regions, flip back to your page to see the changes.

### Demo

Be sure to run `bundle` first, to install the dependencies.

Try a demo Middleman site with MiddleManager activated:

    $ cd fixtures/middle-managed-app
    $ bundle
    $ bundle exec middleman
    $ open http://localhost:4567
    $ open http://localhost:4567/admin

You can also test an example MiddleManager Admin UI on its own:

    $ bundle exec shotgun fixtures/config.ru -s thin
    $ open http://localhost:9393/admin

### Screenshots 

The Admin UI is just a Sinatra app (`MiddleManager::Server`) which can be run as an independent app, or even embedded in other apps via Rack.

![](https://github.com/downloads/audionerd/middlemanager/middlemanager-admin-ui-index.png)

![](https://github.com/downloads/audionerd/middlemanager/middlemanager-admin-ui-region-editing.png)

### Influences

* [Perch](http://grabaperch.com/): a really nice, lightweight CMS written in PHP. If you want a well-tested, well-supported, professional solution, check it out.
[http://grabaperch.com/](http://grabaperch.com/)

* [Create.js](http://createjs.org/)/VIE use RDFa annotations for editable blocks. Really clever idea. If MiddleManager used/implemented this spec, their JavaScript editor should "just work" ...
[http://createjs.org/](http://createjs.org/)

* [Cozy](https://github.com/gnarmis/cozy), which has this concept of a simple REST API backed by the filesystem (if MiddleManager gets a REST API, it'll probably be like this). It has a simple [Node class for file system traversal](https://github.com/gnarmis/cozy/blob/master/node.rb), which is worth a read.

* [Middleman](https://github.com/middleman/middleman), a static site generator, with a simple pipeline to bring flat YAML data into templates. Really smart way to bootstrap editing if you're a programmer. But, with large amounts of data, I wanted a simple Admin UI to manage the complexity (and to bring designers and copywriters into the site-building process). That's the goal for MiddleManager.

### TODO
- More Content Types – Serialize `Content` objects (e.g., `Text`, `Image`, `Article`, etc.) instead of a single simple Hash
- `Region` objects – wrap content in Regions, decorate `Content` with helper methods
- REST API – write a proper API for editing (look at how cozy and create.js are handling it). CRUD for Regions, Pages, etc.
- Better Page Titles – The `title` of a region should be editable somehow, instead of blindly grabbing `data.page.title`
- `mgmt` options – Implement some Perch-style options for the `mgmt` method (e.g., )
- "Shared" Regions – Allow Regions to (selectively) be "Shared" Regions, such that all Regions with the same name are provided the same content. 
  - What if the name is already taken? Does it clobber? Prevent the user from making it Shared until they resolve?
- "Allow Multiple Items" – just like Perch does, basically.
- Content Type API - How will these work? templates? partials? Cells? plugins? Not sure. 
  - Logic-less? I like the idea of logic-less templates (Mustache) for re-usability, but Liquid or even Slim might work, too? 
  - Maybe the developer implements these on their own? Or via template inheritance can override only when necessary?
  - Middleman extension could be passed a param for where to find content templates ...
- Improve Admin UI – Search/Filter/Sort, Pagination
- Big cleanup to the front-end code for the Admin UI (once its a bit more stable).
- Page management
- Split the Middleman extension into its own git repo
