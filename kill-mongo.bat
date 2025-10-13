@echo off
echo =========================================
echo Checking if MongoDB is running on port 27017...
echo =========================================

:: Find any process using port 27017
for /f "tokens=5" %%a in ('netstat -ano ^| find "27017" ^| find "LISTENING"') do (
    set PID=%%a
)

:: Check if PID variable is set
if defined PID (
    echo MongoDB process found on port 27017 with PID: %PID%
    echo Killing process...
    taskkill /PID %PID% /F
    echo Process killed successfully.
) else (
    echo No process found using port 27017.
)

echo =========================================
echo Done.
pause
