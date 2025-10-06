@echo off
REM Before running this script, make sure Docker Desktop is running.

REM Set default values
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



docker-compose -f docker-compose.yml up -d

REM Change to admin/frontend folder
rem cd admin\frontend

REM Small wait before opening browser
rem timeout /t 2 >nul

REM Open frontend in default browser
rem start http://%HOST_IP%:%FRONT_PORT%
