dotnet dev-certs https -v -ep ./cert-aspnetcore.pfx -p ufo
dotnet dev-certs https --trust

set HOST=http://localhost
set HOST_IP_FALLBACK=192.168.0.5
set FRONT_PORT=4500
set GO_PORT=8085
set MONGO_PORT=27027
set MS_MONGO_PORT=5050
set REDIS_PORT=6379
set STS_PORT=5000
set STS_HTTPS_PORT=5001
set STS_ADMIN_PORT=9000
set STS_ADMIN_HTTPS_PORT=9001
set STS_SERVER=https://sts.skoruba.local
set STS_ADMIN_SERVER=https://admin.skoruba.local
docker-compose up -d --build ft-front

start cmd /c "cd admin/frontend && ng serve -o --port ${FRONT_PORT} --ssl true --ssl-key ../cert-aspnetcore2.pfx --ssl-cert ../cert-aspnetcore.pfx --disable-host-check"
