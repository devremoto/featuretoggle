
FROM node:alpine as builder
RUN apk update && apk add --no-cache make git

WORKDIR /app
ARG port=80
ARG MS_MONGO_PORT=${MS_MONGO_PORT}
ARG HOST=${STS_SERVER}
ARG STS_SERVER=${STS_SERVER}
ARG FRONT_PORT=${FRONT_PORT}

COPY package.json package-lock.json  /app/
RUN cd /app && npm set progress=false && npm install

COPY .  /app
RUN cd /app && npm run build-prod


FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/wwwroot /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
ARG MS_MONGO_PORT=${MS_MONGO_PORT}
ARG HOST=${STS_SERVER}
ARG STS_SERVER=${STS_SERVER}
ARG FRONT_PORT=${FRONT_PORT}
EXPOSE ${port}
CMD ["nginx", "-g", "daemon off;"]
