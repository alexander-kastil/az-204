# Docker Basics & Multistage Build

[Docker](https://www.docker.com/products/docker-desktop)

[Docker CLI](https://docs.docker.com/engine/reference/commandline/cli/)

[NGINX](https://www.nginx.com/)

## Demos

- Create and publish .NET 6 Api image from [food-catalog-api](/app/food-catalog-api/)
- Create and publish Angular UI image from [food-shop-ui](/app/food-shop-ui/)

### Setup Requirements on Windows and Linux

Windows:

- [Windows Subsystem Linux - WSL 2](https://docs.microsoft.com/en-us/windows/wsl/wsl2-about)

- [Install WSL 2 on Windows 10](https://pureinfotech.com/install-windows-subsystem-linux-2-windows-10/)

Linux:

- Install Azure CLI in WSL Bash:

    ```bash
    curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
    ```

### Create Image & publish to Docker Hub

Create Images for .NET Core Api & Angular UI using `*.dockerfile`

#### .NET 6 Api

Examine [/app/food-catalog-api/Dockerfile](/app/food-catalog-api/Dockerfile):

```docker

```yaml
# Build Image
FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine AS build
WORKDIR /build

COPY . .
RUN dotnet restore "catalog-api.csproj"
RUN dotnet publish -c Release -o /app

# Runtime Image
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS final
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "catalog-api.dll"]
```

Build & Run Image:

```
docker build --rm -f Dockerfile -t food-catalog-api .
docker run -it --rm -p 5051:80 food-catalog-api
```

Browse using `http://localhost:5051/food`

Publish Image to Docker Hub:

```
docker tag food-catalog-api arambazamba/food-catalog-api
docker push arambazamba/food-catalog-api
```

### Angular UI

Examine Examine [/app/food-shop-ui/Dockerfile](/app/food-shop-ui/Dockerfile)::

```docker
FROM node:18-alpine as build
LABEL author="Alexander Pajer"

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

##### Stage 2 - Create the run-time-image
FROM nginx:alpine
VOLUME /var/cache/nginx

# Take output from node build
COPY --from=build /app/dist/food-shop-ui/ /usr/share/nginx/html
# Add nginx url rewriteconfig
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
# Substitute environment vars
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
```

Build & Run Image:

```
docker build --rm -f Dockerfile -t food-shop-ui .
docker run -d --rm -p 5052:80 --env ENV_API_URL="https://localhost:5051" 
```

Browse using `http://localhost:5052`

Publish Image to Docker Hub:

```
docker tag food-shop-ui arambazamba/food-shop-ui
docker push arambazamba/food-shop-ui
```