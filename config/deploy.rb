require "bundler/capistrano"
default_run_options[:pty] = true  # Must be set for the password prompt
                                  # from git to work

set :application, "megapont"
set :repository, "git@github.com:onemanstartup/mm.git"  # Your clone URL
set :scm, "git"
set :user, "deploy"  # The server's user for deploys
set :scm_passphrase, "sMDNtCJDCk5WOISg4C"  # The deploy user's password
set :use_sudo, false
set :folder, "brand"

set :deploy_to, "/home/deploy/#{folder}/"
set :domain, "megapont.ru"

# set :scm, :git # You can set :scm explicitly or Capistrano will make an intelligent guess based on known version control directory names
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`

server "#{domain}", :app, :web, :db, :primary => true



ssh_options[:forward_agent] = true
set :branch, "master"
set :deploy_via, :remote_cache
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
