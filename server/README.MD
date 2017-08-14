
# before you start
docker build -t dummy-app .

## adding in the 'data/db' folder
run --rm -v /:/host mhart/alpine-node mkdir -p /host/data/db

## Starting the server

```
docker-compose up --build
```

# Some Notes for 'container builders'

## Removing old container images
sometimes you need to get rid of old container (becasue there is new code, for example)
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

or remove them all
```
docker-compose rm
```

##removing 'docker' images

$> docker images
```
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
server_webapi       latest              b3d0888a166f        2 minutes ago       135MB
mhart/alpine-node   latest              80d51c10ba0a        4 days ago          64.4MB
mongo               latest              b39de1d79a53        5 days ago          359MB
```

then just pass in the varius IMAGE ID's that you wish to delete to docker using rmi option
for example if you want to remove server_webapi and mongo

$> docker rmi b3d0888a166f b39de1d79a53 80d51c10ba0a -f

## building the container images
```
docker-compose --build
```
