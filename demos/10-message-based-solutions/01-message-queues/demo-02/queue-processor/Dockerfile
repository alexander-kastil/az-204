FROM mcr.microsoft.com/dotnet/sdk:6.0 AS installer-env

# Build requires 3.1 SDK
COPY --from=mcr.microsoft.com/dotnet/core/sdk:3.1 /usr/share/dotnet /usr/share/dotnet

COPY . /src/dotnet-function-app
RUN cd /src/dotnet-function-app && \
    mkdir -p /home/site/wwwroot && \
    dotnet publish *.csproj --output /home/site/wwwroot

# To enable ssh & remote debugging on app service change the base image to the one below
# FROM mcr.microsoft.com/azure-functions/dotnet:4-appservice
FROM mcr.microsoft.com/azure-functions/dotnet:4
ENV AzureWebJobsScriptRoot=/home/site/wwwroot \
    AzureFunctionsJobHost__Logging__Console__IsEnabled=true

COPY --from=installer-env ["/home/site/wwwroot", "/home/site/wwwroot"]

# docker build --rm -f Dockerfile -t queueprocessor .
# docker run -d --rm -p 5052:80 -e "QueueConnectionString=DefaultEndpointsProtocol=https;AccountName=msgqueue10949;AccountKey=AVL5+aRkH8SO66WfIDFKPEYcFvpPpJEkqVSCNSGvh2khTSO6P3Oskcjk/ZBYqGdrmmqaFUazzlxf+ASt8olW2w==;EndpointSuffix=core.windows.net" queueprocessor

# docker tag queueprocessor arambazamba/queueprocessor
# docker push arambazamba/queueprocessor