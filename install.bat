dotnet dev-certs https -v -ep ./cert-aspnetcore2.pfx -p ufo
dotnet dev-certs https --trust
rem FRONT_PORT=4200 GO_PORT=8085 MS_MONGO_PORT=5050 REDIS_PORT=6379 STS_PORT=5000 STS_ADMIN_PORT=9000 docker-compose build

@REM set STS_ADMIN_HTTPS_PORT=9001
@REM set STS_HTTPS_PORT=5002
@REM set STS_ADMIN_SERVER=https://localhost:${STS_ADMIN_HTTPS_PORT}
@REM set STS_SERVER=https://localhost:${STS_HTTPS_PORT}
@REM set FRONT_PORT=4200
@REM set GO_PORT=8085
@REM set MS_MONGO_PORT=5050
@REM set REDIS_PORT=6379
@REM set STS_PORT=5000
@REM set STS_ADMIN_PORT=9000

set HOST_IP_FALLBACK=192.168.0.5
set FRONT_PORT=4500
set GO_PORT=8085
set MS_MONGO_PORT=5050
set REDIS_PORT=6379
set STS_PORT=5000
set STS_HTTPS_PORT=5001
set STS_ADMIN_PORT=9000
set STS_ADMIN_HTTPS_PORT=9001



set STS_SERVER=http://ft-sts
set STS_ADMIN_SERVER=http://ft-sts-admin
docker-compose up -d --build


start cmd /c "cd admin/frontend && ng serve -o --port ${FRONT_PORT} --ssl true --ssl-key ../cert-aspnetcore2.pfx --ssl-cert ../cert-aspnetcore2.pfx --disable-host-check"
