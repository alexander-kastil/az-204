FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 5000

ENV ASPNETCORE_URLS=http://+:5000

# Creates a non-root user with an explicit UID and adds permission to access the /app folder
# For more info, please refer to https://aka.ms/vscode-docker-dotnet-configure-containers
RUN adduser -u 5678 --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser

FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:6.0 AS build
ARG configuration=Release
WORKDIR /src
COPY ["catalog-api.csproj", "./"]
RUN dotnet restore "catalog-api.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "catalog-api.csproj" -c $configuration -o /app/build

FROM build AS publish
ARG configuration=Release
RUN dotnet publish "catalog-api.csproj" -c $configuration -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "catalog-api.dll"]


# Build Image
# docker build --rm -f dockerfile -t food-catalog-api .
# docker run -it --rm -p 5051:80 food-catalog-api

# docker tag food-catalog-api arambazamba/food-catalog-api
# docker push arambazamba/food-catalog-api

# Injecting environment variables into the container
# docker run -it --rm -p 5051:80 food-catalog-api -e "App:AuthEnabled"="false"

# Browse using: 
# http://localhost:5051
# http://localhost:5051/food
# http://localhost:5051/env