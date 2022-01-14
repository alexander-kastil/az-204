# Docker Basics & Multistage Build

[Docker](https://www.docker.com/products/docker-desktop)

[Docker CLI](https://docs.docker.com/engine/reference/commandline/cli/)

[NGINX](https://www.nginx.com/)

## Demos

- Ceate and publish .NET 6 Api image
- Ceate and publish Angular UI image

### Setup Requirements on Windows and Linux

Windows:

- [Windows Subsystem Linux - WSL 2](https://docs.microsoft.com/en-us/windows/wsl/wsl2-about)

- [Install WSL 2 on Windows 10](https://pureinfotech.com/install-windows-subsystem-linux-2-windows-10/)

Linux:

- Install Azure CLI in WSL Bash:

    ```bash
    curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
    ```

### Create Image & publish to Dockerhub

Create Images for .NET Core Api & Angular UI using `*.dockerfile`

#### .NET 6 Api

Inspect `./food-app/food-api/dockerfile`:

```yaml
FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine AS build
WORKDIR /build

COPY . .
RUN dotnet restore "food-api.csproj"
RUN dotnet publish -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS final
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "FoodApi.dll"]
```

Build & Run Image:

```
docker build --rm -f "dockerfile" -t foodapi .
docker run -it --rm -p 5051:80 foodapi
```

Browse using `http://localhost:5051/food`

Publish Image to Docker Hub:

```
docker tag foodapi arambazamba/foodapi
docker push arambazamba/foodapi
```

### Angular UI

Inspect `./food-app/food-ui/dockerfile`:

```docker
FROM node:14 as node
LABEL author="Alexander Pajer"
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
RUN npm run build -- --prod

FROM nginx:alpine
VOLUME /var/cache/nginx

COPY --from=node /app/dist/food-ui /usr/share/nginx/html 
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
```

Build & Run Image:

```
docker build --rm -f "dockerfile" -t foodui .
docker run -d --rm -p 5052:80 foodui
```

Browse using `http://localhost:5052`

Publish Image to Docker Hub:

```
docker tag foodui arambazamba/foodui
docker push arambazamba/foodui
```