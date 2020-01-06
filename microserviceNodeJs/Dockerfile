FROM node:alpine


# Create app directory
WORKDIR /usr/src/app
ARG port=5000
ARG redis_port=6379

ENV DB_URL "mongodb://ft-mongodb:27017/featuretoggledb"
ENV REDIS_SERVER "ft-redis"
ENV REDIS_PORT  $redis_port

ENV PORT $port

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# If you are building your code for production
RUN npm install


# Bundle app source
COPY . .

EXPOSE $port
CMD [ "npm", "start" ]

#To build and run this app on docker, execute the following commands
#docker build -t Arquivo.img.node .
#docker run -d -p 5000:5000 --name Arquivo.container.node Arquivo.img.node