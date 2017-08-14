
# Installing DOCKER CONTAINERS

## download docker
```
https://www.docker.com/get-docker
```

Scroll down the page to the bottom and to 'DOCKER COMMUNITY EDITION (CE)' and pick the appropriate  installer for your platform...


#Mac OSX Users#

https://store.docker.com/editions/community/docker-ce-desktop-mac (mac)
or
https://store.docker.com/editions/community/docker-ce-server-debian (linux)


and then just copy the project code into a folder somewhere on yor machine.
(wherever you normally work)

## Running the 'server-side' environment
(Build the OS, Tools, WebApi Server, NoSQL Database Server and load some Mock Data)

Open a terminal window and at the command navigate into the server project folder
```
cd [install path to project]/server
```

and enter one simple command
```
docker-compose up --build
```

# WINDOWS USERS #

## down load the appropaite docker installer (or docker toolbox)

https://store.docker.com/editions/community/docker-ce-desktop-windows (windows 10)
https://download.docker.com/win/stable/DockerToolbox.exe (windows less than 10)

or

https://store.docker.com/editions/community/docker-ce-azure (azure)


## ensure that you have python installed ##
Make sure that 'Python version 2.7 runtime (2.7.13 is the latest at time of writing)'
https://www.python.org/downloads/

#Check if the OS can run docker Vm Shell
https://www.microsoft.com/en-us/download/confirmation.aspx?id=592


##Make sure you have the lates PowerShell Modules installed
https://www.microsoft.com/en-us/download/confirmation.aspx?id=51451

##Follow these Instructions
https://docs.docker.com/toolbox/toolbox_install_windows/#how-to-uninstall-toolbox


Copy the source code into a folder under your personal user directoy
c:/users/[user.name]/[directory]

Open the 'Docker Quickstart Terminal' that was installed by "Docker Toolbox"


Navigate into the folder tht you copied the source code into
```
cd [directory]/server
```

##Make sure that the Docker-Machine' is insalled and set env variables.
```
docker-machine env
eval $("C:\Program Files\Docker Toolbox\docker-machine.exe" env)
```

## make sure that docker-machine is started
docker-machine start default.

##build the sever container
docker-compose build


## 'spin up' the docker container
```
docker-compose up
```

docker build -t web .


# Some Bits and Bobs of notes for 'container builders' / cleaning up / resetting
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

##removing individual 'docker' images

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


# building container images one time (rather than everytime)
```
docker-compose build
```

## then just 'spin up' the stack to use it.
```
docker-compose up
```