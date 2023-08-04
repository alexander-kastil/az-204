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

# docker build --rm -f Dockerfile -t food-payments .
# docker run -d --rm -p 5052:80 -e "PaymentConnectionString=DefaultEndpointsProtocol=https;AccountName=foodpayment27404;AccountKey=c8b3/fvrP6uDVsAlYQzvzMX9pvKNazmmidICZW/cj10imcYyIIDuJz6VbzJUzObw+sIjKqFSiHFs+AStEPXFkw==;EndpointSuffix=core.windows.net" -e "Sleep=500" -e "APPINSIGHTS_INSTRUMENTATIONKEY=80fe34b9-dae6-4532-9d81-7ee056098c81" food-payments

# docker tag food-payments arambazamba/food-payments
# docker push arambazamba/food-payments