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

# docker build --rm -f Dockerfile -t food-picoptimizer .

# docker run -d --rm -p 5054:80 -e "AzureWebJobsStorage=DefaultEndpointsProtocol=https;EndpointSuffix=core.windows.net;AccountName=picprocessor4241;AccountKey=zT1cbseG40s8JpdLxhanppLQO0CAOKFPIt2X5AuVquLDH4bznOCTBcRrer+WyCuuVF35IQsdIkp3+AStaljIzw==;BlobEndpoint=https://picprocessor4241.blob.core.windows.net/;FileEndpoint=https://picprocessor4241.file.core.windows.net/;QueueEndpoint=https://picprocessor4241.queue.core.windows.net/;TableEndpoint=https://picprocessor4241.table.core.windows.net/" food-picoptimizer 

# docker tag food-picoptimizer alexander-kastil/food-picoptimizer
# docker push alexander-kastil/food-picoptimizer