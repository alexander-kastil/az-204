# Creating & Managing Containers

> Note: Use FoodApp from folder "99 FoodApp"

## Docker

Create Images for .NET Core Api & Angular UI using `*.dockerfile`

### Create Image & Deploy to Dockerhub / Azure

#### Api

Inspect `./FoodApp/FoodApi/api.prod.dockerfile`:

```docker
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS base
LABEL author="Alexander Pajer"
WORKDIR /app

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /src

COPY ["*.csproj", "."]
RUN dotnet restore "FoodApi.csproj"
COPY . .
RUN dotnet build "FoodApi.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "FoodApi.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "FoodApi.dll"]
```

Build & Run Image:

```
docker build --rm -f "app.prod.dockerfile" -t foodservice .
docker run -it --rm -p 8085:80 foodservice
```

Browse using `http://localhost:5050/api/food`

Publish Image to Docker Hub:

```
docker tag foodservice arambazamba/foodservice
docker push arambazamba/foodservice
```

#### UI

Inspect `./FoodApp/FoodUI/ui.prod.dockerfile`:

```docker
FROM node:12.10 as node
LABEL author="Alexander Pajer"
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
RUN npm run build -- --prod

FROM nginx:alpine
VOLUME /var/cache/nginx

COPY --from=node /app/dist/FoodUI /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
```

Build & Run Image:

```
docker build --rm -f "app.prod.dockerfile" -t foodui .
docker run -d --rm -p 8086:80 foodui
```

Publish Image to Docker Hub:

```
docker tag foodui arambazamba/foodui
docker push arambazamba/foodui
```

## Azure Container Registry

Publish to ACR:

Execute `create-container-reg` and upload:

```
docker tag foodui foodacr-1234.azurecr.io/foodui:1.1.0
docker push foodacr-1234.azurecr.io/foodui:1.1.0
```
