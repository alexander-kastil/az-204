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

# docker build --rm -f Dockerfile -t food-invoices .
# docker run -d --rm -p 5052:80 -e "InvoiceConnectionString=DefaultEndpointsProtocol=https;AccountName=foodstoragedev;AccountKey=tu+FsWzY8Dpl7JS1I1FxZhOC5NHt0GR+Nb/mEbgwffVRXHf4nMqSfCmXHk+wxUEOaWwZLDDLj3DK+AStKv2X/Q==;EndpointSuffix=core.windows.net" -e "Sleep=500" -e "APPINSIGHTS_INSTRUMENTATIONKEY=80fe34b9-dae6-4532-9d81-7ee056098c81" food-invoices

# docker tag food-invoices alexander-kastil/food-invoices
# docker push alexander-kastil/food-invoices