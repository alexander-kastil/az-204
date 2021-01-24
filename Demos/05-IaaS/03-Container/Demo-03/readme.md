# Azure Container Registry Build

## Simple Node Express App

Build Docker & Test

```
docker build -t arambazamba/node-app .
docker run -p 8090:80 -d arambazamba/node-app
```

Execute `create-acr-build.azcli`
