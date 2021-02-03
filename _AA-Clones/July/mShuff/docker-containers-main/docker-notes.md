# Docker Container Notes

## $ Common Docker Terminology

- **Images** are blueprints of our application which form the basis of containers. Download with `docker pull`

- **Containers** are what run the image.  Created with `docker run`. View with `docker ps`

- **Docker Daemon** is the background service running on the host that manage building, running, and distributing Docker Containers.  The process that runs in the OS that the client talks to

- **Docker Client** is the CLI tool that allows the user to interact with the daemon.  There are other clients as well

- **Docker Hub** is a *registry* of Docker images.  You can sign up and download or upload your own as well

## $ Running Docker Containers

- `docker pull <<image>>` fetches an image

- `docker images` list all images

- `docker run <<image>>` run Docker container
  - `docker run <<flags>> <<image>> <<command>>` run Docker container with command
    - `docker run -it busybox sh` run busybox shell in interactive tty mode
    - `--rm` automatically deletes containers once exited
  - `docker run --help` shows more commands/help

- `docker ps` shows all containers currently running
  - `docker ps -a` shows all containers we've run

- **Common Flags**
  - `-d` is for detached mode, which means it will run in the background of your terminal
    - `docker stop <<containerId>>` to stop a detached container
  - `-P` will publish exposted ports to random ports
    - `-p` to specify a custom port for client to forward connections to the container
    - `docker port <<container>>` to see ports running currently
  - `--name` Give something a name

## $ Removing Docker Containers

- `docker rm <<containerId>>` to remove a container after use. ID will be echoed on delete
  - `docker rm $(docker ps -a -q -f status=exited)` deletes all exited containers
    - `-q` only returns Numeric IDs
    - `-f` filters based on conditions
  - `docker rmi` delete images no longer needed
