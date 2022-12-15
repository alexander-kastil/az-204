# Web App for Containers

[Run a custom container in Azure App Service](https://docs.microsoft.com/en-us/azure/app-service/quickstart-custom-container?tabs=dotnet&pivots=container-linux)

## Demo

Execute `create-wa-containers.azcli`:

```bash
rnd=$RANDOM
grp=az204-m01-wacontainers-$rnd
loc=westeurope
appPlan=foodapp-wac$rnd
app=foodui-wac-$rnd
img=arambazamba/foodui

az group create --name $grp --location $loc
az appservice plan create --name $appPlan -g $grp --sku B1 --is-linux --number-of-workers 1
az webapp create -g $grp -p $appPlan -n $app -i $img
```

Examine `./food-app/food-api/dockerfile`:

```yaml
FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine AS build
WORKDIR /build

COPY . .
RUN dotnet restore "food-api.csproj"
RUN dotnet publish -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS final
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "food-api.dll"]
```

Build and publish docker image:

```bash
docker build --rm -f dockerfile -t foodapi .
docker tag foodapi arambazamba/foodapi
docker push arambazamba/foodapi
```
