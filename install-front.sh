#!/bin/sh

:'
##Before run this commands on the terminal
##change the file permitions to allow execution

sudo chmod +x ./install.sh
./install.sh
'
sudo chmod +x ./cert.sh
./cert.sh



cd IdentityServer4.Admin/src/Skoruba.IdentityServer4.Admin

sudo dotnet ef migrations add AspNetIdentityDbInit -c AdminIdentityDbContext -o Data/Migrations/Identity

sudo dotnet ef migrations add LoggingDbInit -c AdminLogDbContext -o Data/Migrations/Logging

sudo dotnet ef migrations add IdentityServerConfigurationDbInit -c IdentityServerConfigurationDbContext -o Data/Migrations/IdentityServerConfiguration

sudo dotnet ef migrations add IdentityServerPersistedGrantsDbInit -c IdentityServerPersistedGrantDbContext -o Data/Migrations/IdentityServerGrants

cd ../../../

#docker network create ft-network
HOST_IP=192.168.0.6
FRONT_PORT=4500
GO_PORT=8085
MS_MONGO_PORT=5050
REDIS_PORT=6379
STS_PORT=5000
STS_HTTPS_PORT=5001
STS_ADMIN_PORT=9000
STS_ADMIN_HTTPS_PORT=9001
STS_SERVER=http://$HOST_IP
STS_ADMIN_SERVER=http://$HOST_IP


sudo FRONT_PORT=$FRONT_PORT \
GO_PORT=$GO_PORT \
MS_MONGO_PORT=$MS_MONGO_PORT \
REDIS_PORT=$REDIS_PORT \
STS_PORT=$STS_PORT \
STS_HTTPS_PORT=$STS_HTTPS_PORT \
STS_ADMIN_PORT=$STS_ADMIN_PORT \
STS_ADMIN_HTTPS_PORT=$STS_ADMIN_HTTPS_PORT \
STS_SERVER=$STS_SERVER \
STS_ADMIN_SERVER=$STS_ADMIN_SERVER \
docker-compose -f docker-compose.yml build


sudo FRONT_PORT=$FRONT_PORT \
GO_PORT=$GO_PORT \
MS_MONGO_PORT=$MS_MONGO_PORT \
REDIS_PORT=$REDIS_PORT \
STS_PORT=$STS_PORT \
STS_HTTPS_PORT=$STS_HTTPS_PORT \
STS_ADMIN_PORT=$STS_ADMIN_PORT \
STS_ADMIN_HTTPS_PORT=$STS_ADMIN_HTTPS_PORT \
STS_SERVER=$STS_SERVER \
STS_ADMIN_SERVER=$STS_ADMIN_SERVER \
docker-compose -f docker-compose.yml up 

#gnome-terminal --tab --title="ft-frontend" --command="bash -c 'cd admin/frontend & xdg-open \"http://${HOST_IP}:${FRONT_PORT}\"'"

#xdg-open "http://${HOST_IP}:${MS_MONGO_PORT}/featuretoggle/v1/swagger" &
#xdg-open "http://${HOST_IP}:${MS_MONGO_PORT}/featuretoggle/v1/featuretoggles" &
#xdg-open "http://${HOST_IP}:${GO_PORT}/feature" &
#xdg-open "http://${HOST_IP}:${STS_ADMIN_PORT}" &
#xdg-open "http://${HOST_IP}:${STS_PORT}"'
