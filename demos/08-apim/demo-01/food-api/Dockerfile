# Build Image
FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS build
WORKDIR /build

COPY . .
RUN dotnet restore "food-api.csproj"
RUN dotnet publish -c Release -o /app

# Runtime Image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "food-api.dll"]

# Build Image
# docker build --rm -f dockerfile -t food-api .
# docker run -it --rm -p 5051:80 food-api

# docker tag food-api arambazamba/food-api
# docker push arambazamba/food-api