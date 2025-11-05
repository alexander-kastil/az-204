FROM mcr.microsoft.com/dotnet/sdk:6.0 AS installer-env

COPY . /src/dotnet-function-app
RUN cd /src/dotnet-function-app && \
mkdir -p /home/site/wwwroot && \
dotnet publish *.csproj --output /home/site/wwwroot

# To enable ssh & remote debugging on app service change the base image to the one below
# FROM mcr.microsoft.com/azure-functions/dotnet-isolated:4.0-dotnet-isolated6.0-appservice
FROM mcr.microsoft.com/azure-functions/dotnet-isolated:4.0-dotnet-isolated6.0
ENV AzureWebJobsScriptRoot=/home/site/wwwroot \
    AzureFunctionsJobHost__Logging__Console__IsEnabled=true

COPY --from=installer-env ["/home/site/wwwroot", "/home/site/wwwroot"]

# docker build --rm -f Dockerfile -t func-app-docker .
# docker run -d --rm -p 5053:80 -e "MyEnvVar=Changed" func-app-docker

# docker tag func-app-config alexander-kastil/func-app-docker
# docker push alexander-kastil/func-app-docker

# Browse: http://localhost:5053/api/getEnvValue