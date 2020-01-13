#!/bin/sh
##first execute the commands on the terminal
##change the file permitions to allow execution
#chmod +x ./install-sts.sh
##run the file
#./install-sts.sh

cd IdentityServer4.Admin/src/Skoruba.IdentityServer4.Admin

#sudo dotnet ef migrations add AspNetIdentityDbInit -c AdminIdentityDbContext -o Data/Migrations/Identity

#sudo dotnet ef migrations add LoggingDbInit -c AdminLogDbContext -o Data/Migrations/Logging

#sudo dotnet ef migrations add IdentityServerConfigurationDbInit -c IdentityServerConfigurationDbContext -o Data/Migrations/IdentityServerConfiguration

#sudo dotnet ef migrations add IdentityServerPersistedGrantsDbInit -c IdentityServerPersistedGrantDbContext -o Data/Migrations/IdentityServerGrants

cd ../../../

docker network create ft-network

sudo STS_PORT=5000 STS_HTTPS_PORT=5001 STS_ADMIN_PORT=9000 STS_ADMIN_HTTPS_PORT=9001 STS_SERVER=http://localhost STS_ADMIN_SERVER=http://localhost docker-compose -f docker-compose-sts.yml build


sudo STS_PORT=5000 STS_HTTPS_PORT=5001 STS_ADMIN_PORT=9000 STS_ADMIN_HTTPS_PORT=9001 STS_SERVER=http://localhost STS_ADMIN_SERVER=http://localhost docker-compose -f docker-compose-sts.yml up -d

