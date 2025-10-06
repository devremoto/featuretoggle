ARG DOTNET_VERSION=2.2
FROM mcr.microsoft.com/dotnet/core/sdk:${DOTNET_VERSION} AS build

WORKDIR /app
COPY ["Skoruba.IdentityServer4.STS.Identity/Skoruba.IdentityServer4.STS.Identity.csproj", "Skoruba.IdentityServer4.STS.Identity/"]
COPY ["Skoruba.IdentityServer4.Admin.EntityFramework.DbContexts/Skoruba.IdentityServer4.Admin.EntityFramework.DbContexts.csproj", "Skoruba.IdentityServer4.Admin.EntityFramework.DbContexts/"]
COPY ["Skoruba.IdentityServer4.Admin.EntityFramework.Identity/Skoruba.IdentityServer4.Admin.EntityFramework.Identity.csproj", "Skoruba.IdentityServer4.Admin.EntityFramework.Identity/"]
COPY ["Skoruba.IdentityServer4.Admin.EntityFramework/Skoruba.IdentityServer4.Admin.EntityFramework.csproj", "Skoruba.IdentityServer4.Admin.EntityFramework/"]
COPY ["Skoruba.IdentityServer4.STS.Identity/cert-aspnetcore.crt","cert/"]
RUN dotnet restore "Skoruba.IdentityServer4.STS.Identity/Skoruba.IdentityServer4.STS.Identity.csproj"
COPY . ./
RUN dotnet publish "Skoruba.IdentityServer4.STS.Identity/Skoruba.IdentityServer4.STS.Identity.csproj" -c Release -o /app/out

# FROM mcr.microsoft.com/dotnet/aspnet:${DOTNET_VERSION}
FROM mcr.microsoft.com/dotnet/core/aspnet:${DOTNET_VERSION}
ARG STS_PORT=5000
ARG STS_HTTPS_PORT=5001
ARG STS_ADMIN_PORT=9000
ARG STS_ADMIN_HTTPS_PORT=9001
WORKDIR /app
EXPOSE $STS_PORT $STS_HTTPS_PORT
ENV ASPNETCORE_HTTPS_PORT ${STS_HTTPS_PORT}
ENV AdminConfiguration:IdentityAdminBaseUrl "http://192.168.15.18:${STS_ADMIN_PORT}"
COPY --from=build /app/out .
COPY --from=build /app/cert/cert-aspnetcore.crt .
ENTRYPOINT ["dotnet", "Skoruba.IdentityServer4.STS.Identity.dll", "/seed"]