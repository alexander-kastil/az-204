# Docker Basics & Multistage Build

[Docker](https://www.docker.com/products/docker-desktop)

[Docker CLI](https://docs.docker.com/engine/reference/commandline/cli/)

[Kubernetes](https://kubernetes.io/de/)

[NGINX](https://www.nginx.com/)

## Demos

- Build .NET 6 Api
- Build Angular FrontEnd

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

### Angular UI

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