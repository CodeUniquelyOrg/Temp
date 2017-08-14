
# before you start

## Install docker
```
https://www.docker.com/get-docker
```

Scroll down the page to the bottom and to 'DOCKER COMMUNITY EDITION (CE)' and pick the appropriate  installer for your platform...


https://store.docker.com/editions/community/docker-ce-desktop-windows (windows 10)
https://download.docker.com/win/stable/DockerToolbox.exe (windows less than 10)

or

https://store.docker.com/editions/community/docker-ce-desktop-mac (mac)

or

https://store.docker.com/editions/community/docker-ce-azure (azure)

or

https://store.docker.com/editions/community/docker-ce-server-debian (linux)

Windows users will also make ure hat they install 'Python version 2.7 runtime (2.7.13)'
https://www.python.org/downloads/



## Running the 'server-side' environment
(Build the OS, Tools, WebApi Server, NoSQL Database Server and load some Mock Data)

open the 'Docker Quickstart Terminal'

At the command navigate into the server project folder
cd ../.. (should be the root of your c drive)

```
cd [install path]/server
```

###one line - start the build process
```
docker-compose up --build
```

# WINDOWS USERS #

open a "Docker Command Shell"

docker-machine env

eval $("C:\Program Files\Docker Toolbox\docker-machine.exe" env)




#Mac OSX Users#



# Some Notes for 'container builders'
```
docker build -t dummy-app .
```

## adding in the 'data/db' folder
```
run --rm -v /:/host mhart/alpine-node mkdir -p /host/data/db
```

## Removing old container images
Sometimes you need to get rid of old container (becasue there is new code, for example)
```
docker-compose ps
```

                       Name                                     Command             State             Ports
---------------------------------------------------------------------------------------------------------------------
5c1308b01c7f_5c1308b01c7f_5c1308b01c7f_server_web_1   npm start                     Exit 0
server_mongo_1                                        docker-entrypoint.sh mongod   Up       0.0.0.0:27017->27017/tcp
server_mongodata_1                                    /true                         Exit 0

```
docker rm 5c1308b01c7f_5c1308b01c7f_5c1308b01c7f_server_web_1
```

or *JUST remove them all* in one fell swoop
```
docker-compose rm
```

##removing 'docker' images

```
$> docker images
```

Generates a list like this
```
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
server_webapi       latest              b3d0888a166f        2 minutes ago       135MB
mhart/alpine-node   latest              80d51c10ba0a        4 days ago          64.4MB
mongo               latest              b39de1d79a53        5 days ago          359MB
```

then just pass in the various IMAGE ID's that you wish to delete to docker using the 'rmi' option
for example if you want to remove server_webapi, mongo and mhart/alpine-node

```
$> docker rmi -f b3d0888a166f b39de1d79a53 80d51c10ba0a
```

## building the container images
```
docker-compose --build
```
