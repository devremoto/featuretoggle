FROM golang

ARG port=8085
ARG redis_port=6379
ARG redis_server="ft-redis"

ENV PORT $port
ENV REDIS_PORT $redis_port
ENV REDIS_SERVER $redis_server

ADD . /go/src/featuretoggle

RUN go get github.com/go-redis/redis
RUN go get github.com/gorilla/mux

RUN go install featuretoggle

ENTRYPOINT /go/bin/featuretoggle

EXPOSE $port