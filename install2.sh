#!/bin/sh
FRONT_PORT=4200 GO_PORT=8085 MS_MONGO_PORT=5000 REDIS_PORT=6379 docker-compose build


FRONT_PORT=4200 GO_PORT=8085 MS_MONGO_PORT=5000 REDIS_PORT=6379 docker-compose up -d

cd admin/frontend
sleep 2
ng serve -o --port 4300
