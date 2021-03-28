FROM node:12 AS build-stage

WORKDIR /react-app

COPY react-app/. .

# Build our React App
RUN npm install

RUN npm run build

FROM python:3.8

# Setup Flask environment
ENV FLASK_APP=app
ENV FLASK_ENV=production
ENV SQLALCHEMY_ECHO=True

EXPOSE 8000

WORKDIR /var/www

COPY . .
# TODO: Copy build files from build-stage into app/static

# TODO: Install Python Dependencies

# Run flask environment
CMD gunicorn app:app
