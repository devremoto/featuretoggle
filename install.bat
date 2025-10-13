@echo off
REM dotnet dev-certs https -v -ep ./cert-aspnetcore.pfx -p ufo
REM dotnet dev-certs https --trust

call env-vars.bat

rem docker login fazsite
docker-compose up -d --build

REM start cmd /c "cd admin/frontend && ng serve -o --port ${FRONT_PORT} --ssl true --ssl-key ../cert-aspnetcore2.pfx --ssl-cert ../cert-aspnetcore.pfx --disable-host-check"
