# Docker Images

## Commands

- `docker images` to see a list of local images
- `docker search` to search for images

## Images

- Docker Images are the basis of containers
  - **Base Images** are images that have no parent, usually images with an OS like Ubuntu, BusyBox, Debian..
  - **Child Images** are images that build on base images and add additional functionality
  - **Official Images** are images that are officially maintained and supported by Docker.  Typically one word long
  - **User Images** are images created and shared by users

## Dockerfile

- A Dockerfile is a simple text file that contains a list of commands that the client calls when creating an image

- `docker build` creates an image from a *Dockerfile*

```python
# start from base
FROM ubuntu:18.04

MAINTAINER Prakhar Srivastav <prakhar@prakhar.me>

# install system-wide deps for python and node
# yqq to suppress output and assume 'yes' to all prompts
RUN apt-get -yqq update
RUN apt-get -yqq install python3-pip python3-dev curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash
RUN apt-get install -yq nodejs

# copy our application code and set it as current working directory
#   this causes our commands to be run from here
ADD flask-app /opt/flask-app
WORKDIR /opt/flask-app

# fetch app specific deps
RUN npm install
RUN npm run build
RUN pip3 install -r requirements.txt

# expose port
EXPOSE 5000

# start app
CMD [ "python3", "./app.py" ]
```

**Docker Bridge Network** - Uses a software bridge which allows containers connected to the same bridge network to communicate, while providing isolation from containers which are not connected to that bridge network
