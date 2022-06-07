# Check Postgres version

postgres --version

# Check if pg_config version
pg_config --version
# Check Version of Flask
pipenv run flask --version
# run flask app
pipenv run flask run
# Run Flask on Another port
pipenv run flask run -p <port>

# Install to use flask env var
pipenv install python-dotenv~=0.13

# Install Psucopg
pipenv install psycopg2-binary
# Install Flask
pipenv install Flask~=1.1

# Flask Model Migrations
pipenv install alembic Flask-Migrate
# Initializing Migration 
pipenv run flask db init

# Running a Migration
pipenv run flask db migrate -m "create packages table"
pipenv run flask db upgrade


#Start postgresql service
sudo service postgresql start

# Check postgresql status
sudo service postgresql status
