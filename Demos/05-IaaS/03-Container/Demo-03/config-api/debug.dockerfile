FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

ENV ASPNETCORE_URLS=http://+:80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["config-api.csproj", "./"]
RUN dotnet restore "config-api.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "config-api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "config-api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "config-api.dll"]
