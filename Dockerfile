# Jusr create a file named Dockerfile

# import the node version we're using
FROM node:6.10.3

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /app && cp -a /tmp/node_modules /app/

# ADD ./*.* to /app/*.*
# but I want to leave the code where it is right now for edit / debug / recompile

WORKDIR /app
ADD . /app

EXPOSE 80

# Define environment variable
ENV NAME webapi

CMD ["npm", "start"]
