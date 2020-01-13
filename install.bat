dotnet dev-certs https -v -ep ./cert-aspnetcore2.pfx -p ufo
dotnet dev-certs https --trust
FRONT_PORT=4200 GO_PORT=8085 MS_MONGO_PORT=5050 REDIS_PORT=6379 STS_PORT=5000 STS_ADMIN_PORT=9000 docker-compose build


FRONT_PORT=4200 GO_PORT=8085 MS_MONGO_PORT=5050 REDIS_PORT=6379 STS_PORT=5000 STS_ADMIN_PORT=9000  docker-compose up -d

cd admin/frontend

ng serve -o --port 4300
