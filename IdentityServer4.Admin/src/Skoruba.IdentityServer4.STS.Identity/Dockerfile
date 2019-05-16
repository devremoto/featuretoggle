FROM microsoft/dotnet:sdk AS build

WORKDIR /app
COPY ["Skoruba.IdentityServer4.STS.Identity/Skoruba.IdentityServer4.STS.Identity.csproj", "Skoruba.IdentityServer4.STS.Identity/"]
COPY ["Skoruba.IdentityServer4.Admin.EntityFramework.DbContexts/Skoruba.IdentityServer4.Admin.EntityFramework.DbContexts.csproj", "Skoruba.IdentityServer4.Admin.EntityFramework.DbContexts/"]
COPY ["Skoruba.IdentityServer4.Admin.EntityFramework.Identity/Skoruba.IdentityServer4.Admin.EntityFramework.Identity.csproj", "Skoruba.IdentityServer4.Admin.EntityFramework.Identity/"]
COPY ["Skoruba.IdentityServer4.Admin.EntityFramework/Skoruba.IdentityServer4.Admin.EntityFramework.csproj", "Skoruba.IdentityServer4.Admin.EntityFramework/"]
COPY ["Skoruba.IdentityServer4.STS.Identity/cert-aspnetcore.pfx","cert/"]
RUN dotnet restore "Skoruba.IdentityServer4.STS.Identity/Skoruba.IdentityServer4.STS.Identity.csproj"
COPY . ./
RUN dotnet publish "Skoruba.IdentityServer4.STS.Identity/Skoruba.IdentityServer4.STS.Identity.csproj" -c Release -o /app/out

FROM microsoft/dotnet:aspnetcore-runtime
ARG sts_port=5000
ARG sts_https_port=5001
ARG sts_admin_port=9000
ARG sts_admin_https_port=9001
WORKDIR /app
EXPOSE $sts_port $sts_https_port
ENV ASPNETCORE_HTTPS_PORT ${sts_https_port}
ENV AdminConfiguration:IdentityAdminBaseUrl "http://192.168.15.18:${sts_admin_port}"
COPY --from=build /app/out .
COPY --from=build /app/cert/cert-aspnetcore.pfx .
ENTRYPOINT ["dotnet", "Skoruba.IdentityServer4.STS.Identity.dll", "/seed"]