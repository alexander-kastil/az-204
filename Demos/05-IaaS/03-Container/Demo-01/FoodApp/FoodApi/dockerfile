FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /build

COPY . .
RUN dotnet restore "FoodApi.csproj"
RUN dotnet publish -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS final
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "FoodApi.dll"]

# Build Image
# docker build --rm -f "Dockerfile" -t foodservice .

# Run Image
# docker run -it --rm -p 5051:80 foodservice

# Browse using: 
# http://localhost:5051/api/food

# Publish Image to dockerhub
# docker tag foodservice arambazamba/foodservice
# docker push arambazamba/foodservice