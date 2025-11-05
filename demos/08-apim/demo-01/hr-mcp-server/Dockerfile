FROM mcr.microsoft.com/dotnet/sdk:9.0-alpine AS build
WORKDIR /build
COPY . .
RUN dotnet restore "hr-mcp-server.csproj"
RUN dotnet publish -c Release -o /app

# Runtime Image
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "hr-mcp-server.dll"]

# Build Image
# docker build --rm -f dockerfile -t hr-mcp-server .

# Run Image without env vars
# docker run -it --rm -p 5051:8080 hr-mcp-server

# Test on: http://localhost:5051

# Run Image with env vars
# docker run -it --rm -p 5051:8080 hr-mcp-server -e "Endpoint=true" -e "Key=true" -e "Model=true"
