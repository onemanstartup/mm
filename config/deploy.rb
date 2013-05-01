require "rvm/capistrano"
set :rvm_ruby_string, '1.9.3'
#set :rvm_type, :system
require "bundler/capistrano"
default_run_options[:pty] = true  # Must be set for the password prompt
                                  # from git to work

set :application, "megapont"
set :repository, "git@github.com:onemanstartup/mm.git"  # Your clone URL
set :scm, "git"
set :user, "deploy"  # The server's user for deploys
set :use_sudo, false
set :folder, "brand"
ssh_options[:forward_agent] = true
# ssh-add ~/.ssh/id-rsa
set :branch, "master"
set :deploy_via, :remote_cache
set :shared_children, shared_children + %w{data}
set :copy_exclude, [".git", ".DS_Store", ".gitignore", ".gitmodules"]









set :deploy_to, "/home/deploy/#{folder}/"
set :domain, "megapont.ru"

# set :scm, :git # You can set :scm explicitly or Capistrano will make an intelligent guess based on known version control directory names
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`

server "#{domain}", :app, :web, :db, :primary => true



# if you want to clean up old releases on each deploy uncomment this:
# after "deploy:restart", "deploy:cleanup"

# if you're still using the script/reaper helper you will need
# these http://github.com/rails/irs_process_scripts

# If you are using Passenger mod_rails uncomment this:
# namespace :deploy do
#   task :start do ; end
#   task :stop do ; end
#   task :restart, :roles => :app, :except => { :no_release => true } do
#     run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
#   end
# end
#
after "deploy:setup", "deploy:create_release_dir"
after  'deploy' , "deploy:build_site"


namespace :deploy do
  task :create_release_dir, :except => {:no_release => true} do
    run "mkdir -p #{fetch :releases_path}"
  end
  task :build_site do
    run "cd #{deploy_to}current && bundle"
    run "cd #{deploy_to}current && bundle exec middleman build"
  end
end
