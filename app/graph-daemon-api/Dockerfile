FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 5058

ENV ASPNETCORE_URLS=http://+:5058

# Creates a non-root user with an explicit UID and adds permission to access the /app folder
# For more info, please refer to https://aka.ms/vscode-docker-dotnet-configure-containers
RUN adduser -u 5678 --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser

FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:6.0 AS build
ARG configuration=Release
WORKDIR /src
COPY ["graph-mail-daemon.csproj", "./"]
RUN dotnet restore "graph-mail-daemon.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "graph-mail-daemon.csproj" -c $configuration -o /app/build

FROM build AS publish
ARG configuration=Release
RUN dotnet publish "graph-mail-daemon.csproj" -c $configuration -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "graph-mail-daemon.dll"]

# Build Image
# docker build --rm -f dockerfile -t mail-daemon .
# docker run -it --rm -p 5058:80 mail-daemon

# docker tag mail-daemon arambazamba/mail-daemon
# docker push arambazamba/mail-daemon

# Injecting environment variables into the container
# docker run -it --rm -p 5058:80 mail-daemon -e "GraphCfg:ClientSecret=cez8Q~YN3BCUROOC35.FmYiixCgxtalUISBy3dyc"

# Browse using: 
# http://localhost:5058