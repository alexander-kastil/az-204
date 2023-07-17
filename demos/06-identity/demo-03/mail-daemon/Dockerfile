# Build Image
FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine AS build
WORKDIR /build

COPY . .
RUN dotnet restore "mail-daemon.csproj"
RUN dotnet publish -c Release -o /app

# Runtime Image
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS final
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "mail-daemon.dll"]

# Build Image
# docker build --rm -f Dockerfile -t mail-daemon .
# docker run -it --rm -p 5051:80 mail-daemon

# docker tag mail-daemon arambazamba/mail-daemon
# docker push arambazamba/mail-daemon

# Injecting environment variables into the container
# docker run -it --rm -p 5051:80 mail-daemon -e "GraphCfg:ClientSecret=cez8Q~YN3BCUROOC35.FmYiixCgxtalUISBy3dyc"

# Browse using: 
# http://localhost:5051
# http://localhost:5051/food
# http://localhost:5051/env