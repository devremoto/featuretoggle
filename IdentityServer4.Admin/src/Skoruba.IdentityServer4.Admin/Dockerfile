FROM microsoft/dotnet:sdk AS build
WORKDIR /app
COPY ["Skoruba.IdentityServer4.Admin/Skoruba.IdentityServer4.Admin.csproj", "Skoruba.IdentityServer4.Admin/"]
COPY ["Skoruba.IdentityServer4.Admin.EntityFramework.DbContexts/Skoruba.IdentityServer4.Admin.EntityFramework.DbContexts.csproj", "Skoruba.IdentityServer4.Admin.EntityFramework.DbContexts/"]
COPY ["Skoruba.IdentityServer4.Admin.EntityFramework.Identity/Skoruba.IdentityServer4.Admin.EntityFramework.Identity.csproj", "Skoruba.IdentityServer4.Admin.EntityFramework.Identity/"]
COPY ["Skoruba.IdentityServer4.Admin.EntityFramework/Skoruba.IdentityServer4.Admin.EntityFramework.csproj", "Skoruba.IdentityServer4.Admin.EntityFramework/"]
COPY ["Skoruba.IdentityServer4.Admin.BusinessLogic/Skoruba.IdentityServer4.Admin.BusinessLogic.csproj", "Skoruba.IdentityServer4.Admin.BusinessLogic/"]
COPY ["Skoruba.IdentityServer4.Admin.BusinessLogic.Shared/Skoruba.IdentityServer4.Admin.BusinessLogic.Shared.csproj", "Skoruba.IdentityServer4.Admin.BusinessLogic.Shared/"]
COPY ["Skoruba.IdentityServer4.Admin.BusinessLogic.Identity/Skoruba.IdentityServer4.Admin.BusinessLogic.Identity.csproj", "Skoruba.IdentityServer4.Admin.BusinessLogic.Identity/"]
COPY ["Skoruba.IdentityServer4.Admin/cert-aspnetcore.pfx","cert/"]
RUN dotnet restore "Skoruba.IdentityServer4.Admin/Skoruba.IdentityServer4.Admin.csproj"
COPY . ./

RUN dotnet publish "Skoruba.IdentityServer4.Admin/Skoruba.IdentityServer4.Admin.csproj" -c Release -o /app/out


FROM microsoft/dotnet:aspnetcore-runtime
ARG sts_port=5000
ARG sts_https_port=5001
ARG sts_admin_port=9000
ARG sts_admin_https_port=9001
EXPOSE $sts_admin_port $sts_admin_https_port
WORKDIR /app
ENV ASPNETCORE_HTTPS_PORT ${sts_admin_https_port}
ENV AdminConfiguration:IdentityAdminBaseUrl "http://192.168.15.18:${sts_admin_port}"
ENV AdminConfiguration:IdentityAdminRedirectUri "http://192.168.15.18:${sts_admin_port}/signin-oidc"
ENV AdminConfiguration:IdentityServerBaseUrl "http://192.168.15.18:${sts_port}"
COPY --from=build /app/out .
COPY --from=build /app/cert/cert-aspnetcore.pfx .
#RUN apt-get update && apt-get -y install iputils-ping


ENTRYPOINT ["dotnet", "Skoruba.IdentityServer4.Admin.dll", "/seed"]