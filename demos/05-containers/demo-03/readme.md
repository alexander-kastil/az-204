# Azure Container Registry Build Task

## Food App

Examine [/app/create-images.azcli](/app/create-images.azcli). This script builds the containers for food-app and pushes them to Azure Container Registry.

## Config-api & Config-ui - Simple 2-tier app
Remove existing `node_modules` and `.angular` folders in `config-ui`, if present to reduce upload time to Azrue container registry.

Execute `create-acr-build.azcli`:

```bash
acr=integrationsonline.azurecr.io

az acr login --name $acr
az acr build --image ng-config --registry $acr --file Dockerfile .
```