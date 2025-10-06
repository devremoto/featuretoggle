@echo off


set directory=%~dp0
cd /d %directory%. 
cd shared/nginx/certs
mkcert --install
copy $env:LOCALAPPDATA\mkcert\rootCA.pem ./cacerts.pem
copy $env:LOCALAPPDATA\mkcert\rootCA.pem ./cacerts.crt
docker login
rem !/bin/sh
rem rem first execute the commands on the terminal
rem rem change the file permitions to allow execution
rem chmod +x ./install-sts.sh
rem rem run the file
rem ./install-sts.sh

cd IdentityServer4.Admin/src/Skoruba.IdentityServer4.Admin

rem sudo dotnet ef migrations add AspNetIdentityDbInit -c AdminIdentityDbContext -o Data/Migrations/Identity

rem sudo dotnet ef migrations add LoggingDbInit -c AdminLogDbContext -o Data/Migrations/Logging

rem sudo dotnet ef migrations add IdentityServerConfigurationDbInit -c IdentityServerConfigurationDbContext -o Data/Migrations/IdentityServerConfiguration

rem sudo dotnet ef migrations add IdentityServerPersistedGrantsDbInit -c IdentityServerPersistedGrantDbContext -o Data/Migrations/IdentityServerGrants

cd ../../../

docker network create ft-network
set STS_PORT=5000 
set STS_HTTPS_PORT=5001 
set STS_ADMIN_PORT=9000 
set STS_ADMIN_HTTPS_PORT=9001 
set STS_SERVER=http://localhost 
set STS_ADMIN_SERVER=http://localhost 

docker-compose -f docker-compose-sts.yml up --build -d


rem docker-compose -f docker-compose-sts.yml up -d STS_PORT=5000 STS_HTTPS_PORT=5001 STS_ADMIN_PORT=9000 STS_ADMIN_HTTPS_PORT=9001 STS_SERVER=http://localhost STS_ADMIN_SERVER=http://localhost

pause