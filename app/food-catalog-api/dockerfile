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

# Build Image
# docker build --rm -f dockerfile -t food-catalog-api .
# docker run -it --rm -p 5051:80 food-catalog-api

# docker tag food-catalog-api arambazamba/food-catalog-api
# docker push arambazamba/food-catalog-api

# Injecting environment variables into the container
# docker run -it --rm -p 5051:80 food-catalog-api -e "App__2__AuthEnabled"="false"

# Browse using: 
# http://localhost:5051
# http://localhost:5051/food
# http://localhost:5051/env