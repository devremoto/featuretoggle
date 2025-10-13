@echo off
REM Before running this script, make sure Docker Desktop is running.

REM Set default values
call env-vars.bat



docker-compose -f docker-compose.yml up -d

REM Change to admin/frontend folder
rem cd admin\frontend

REM Small wait before opening browser
rem timeout /t 2 >nul

REM Open frontend in default browser
rem start http://%HOST_IP%:%FRONT_PORT%
