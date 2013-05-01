load 'deploy'
# Uncomment if you are using Rails' asset pipeline
    # load 'deploy/assets'
load 'config/deploy' # remove this line to skip loading any of the default task

desc "Mirrors the remote shared public directory with your local copy, doesn't download symlinks"
task :import_remote_assets do
   run_locally("rsync --recursive --times --rsh=ssh --compress --human-readable --progress #{user}@#{domain}:~/#{folder}/current/data/ data")
   run_locally("rsync --recursive --times --rsh=ssh --compress --human-readable --progress #{user}@#{domain}:~/#{folder}/current/source/images/ source/images")
end
