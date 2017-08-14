# create a file named Dockerfile

# FROM mhart/alpine-node:latest
FROM node:6.10.3

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /app && cp -a /tmp/node_modules /app/

# ADD ./*.* to /app/*.*
# but i want o leave the code where it is right now for edit / debug / recompile

WORKDIR /app
ADD . /app

EXPOSE 8000

CMD ["npm", "start"]
