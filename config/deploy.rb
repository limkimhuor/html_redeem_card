# config valid only for current version of Capistrano
lock "3.8.1"

set :application, ENV["APP_NAME"]
set :repo_url, ENV["REPO_URL"]
set :assets_roles, [:app]
set :bundle_binstubs, ->{shared_path.join("bin")}
set :deploy_via, :remote_cache
set :stage, ENV["RAILS_ENV"]
set :rails_env, ENV["RAILS_ENV"]

# if fetch(:deploy_ref)
#   set :branch, fetch(:deploy_ref)
# else
#   raise "Please set $DEPLOY_REF"
# end

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

set :rvm1_ruby_version, "2.3.1"
set :deploy_to, "/usr/local/rails_apps/#{fetch :application}"
set :passenger_roles, :app
set :passenger_restart_runner, :sequence
set :passenger_restart_wait, 5
set :passenger_restart_limit, 2
set :passenger_restart_with_sudo, false
set :passenger_environment_variables, {}
set :passenger_restart_command, "passenger-config restart-app"
set :passenger_restart_options, -> { "#{deploy_to} --ignore-app-not-running" }
set :passenger_rvm_ruby_version, "2.3.1"

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, "config/database.yml", "config/secrets.yml"
set :linked_dirs, %w(bin log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system public/uploads)

# Default value for linked_dirs is []
# append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system"

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
# set :keep_releases, 5

set :default_env, {
  rails_env: ENV["RAILS_ENV"],
  repo_url: ENV["REPO_URL"],
  secret_key_base: ENV["SECRET_KEY_BASE"],
  database_name: ENV["DATABASE_NAME"],
  database_hostname: ENV["DATABASE_HOSTNAME"],
  database_username: ENV["DATABASE_USERNAME"],
  database_password: ENV["DATABASE_PASSWORD"],
}

namespace :deploy do
  desc "create database"
  task :create_database do
    on roles(:db) do |host|
      within "#{release_path}" do
        with rails_env: fetch(:rails_env) do
          execute :rake, "db:create"
        end
      end
    end
  end
  before :migrate, :create_database

  desc "link dotenv"
  task :link_dotenv do
    on roles(:app) do
      execute "ln -s /home/deploy/.env #{release_path}/.env"
    end
  end
  before :restart, :link_dotenv

  desc "Restart application"
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      invoke "passenger:restart"
    end
  end
  after :publishing, :restart unless fetch(:stage).to_sym == :production

  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
      # within release_path do
      #   execute :rake, 'cache:clear'
      # end
    end
  end

  if ENV["TMP_CACHE_CLEAR"]
    desc "clear tmp cache asset"
    task :tmp_cache_clear do
      run_locally do
        within release_path do
          with rails_env: fetch(:rails_env) do
            execute :rake, "tmp:cache:clear"
          end
        end
      end
    end
    before "deploy:assets:precompile", "tmp_cache_clear"
  end
end
