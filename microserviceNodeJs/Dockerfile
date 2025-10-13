FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Accept build arguments and set default values if not provided
ARG MONGO_PORT=27027
ARG REDIS_SERVER=ft-redis
ARG REDIS_PORT=6379
ARG MS_MONGO_PORT=5050

# Set environment variables from build arguments
ENV MONGO_PORT=${MONGO_PORT}
ENV DB_URL="mongodb://ft-mongodb:27017/featuretoggledb"
ENV REDIS_SERVER=${REDIS_SERVER}
ENV REDIS_PORT=${REDIS_PORT}
ENV MS_MONGO_PORT=${MS_MONGO_PORT}

ENV MS_MONGO_PORT=${MS_MONGO_PORT:-5050}

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# If you are building your code for production
RUN npm install


# Bundle app source
COPY . .

EXPOSE ${MS_MONGO_PORT:-5050}
CMD [ "npm", "start" ]

#To build and run this app on docker, execute the following commands
#docker build -t Arquivo.img.node .
#docker run -d -p 5050:5050 --name Arquivo.container.node Arquivo.img.node