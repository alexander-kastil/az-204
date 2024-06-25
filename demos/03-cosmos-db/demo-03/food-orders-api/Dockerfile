# Build Image
FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS build
WORKDIR /build

COPY . .
RUN dotnet restore "orders-api.csproj"
RUN dotnet publish -c Release -o /app

# Runtime Image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "orders-api.dll"]

# Build Image
# docker build --rm -f Dockerfile -t food-orders-api .
# docker run -it --rm -p 5054:80 food-orders-api

# docker tag food-orders-api arambazamba/food-orders-api
# docker push arambazamba/food-orders-api

# Injecting environment variables into the container
# docker run -it --rm -p 5051:80 food-orders-api -e "App__2__AuthEnabled"="false"

# Browse using: 
# http://localhost:5054
