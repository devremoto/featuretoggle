@echo off
call env-vars.bat
title=RUN LOCAL
start cmd /c "cd %~dp0/admin/frontend & npm i --force & title=front & ng serve -o --port=%PORT% & title=front " 
rem start cmd /c "title=admin & cd %~dp0/identityServer4.Admin & dotnet build & dotnet publish & dotnet run seed dotnet run --server.urls http://0.0.0.0:44303 & pause"
rem start cmd /c "title=sts & cd %~dp0/identityServer4.STS.Identity & dotnet build & dotnet publish & dotnet run --server.urls http://
