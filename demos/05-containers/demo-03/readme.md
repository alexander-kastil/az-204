# Azure Container Registry Build Task

## Food App

Examine [/app/publish-containers](/app/publish-containers.azcli). This script builds the containers for food-app and pushes them to Azure Container Registry.

## Config-api & Config-ui - Simple 2-tier app
Remove existing `node_modules` and `.angular` folders in `config-ui`, if present to reduce upload time to Azrue container registry.

Execute [publish-containers.azcli](publish-containers.azcli) in the current folder:

```bash
env=dev
grp=az204-m05-containers
loc=westeurope
acr=configacr$env
imgApi=config-api
imgUI=config-ui

az group create -n $grp -l westeurope

az acr create -g $grp -n $acr --sku Basic
az acr login --name $acr
az acr update -n $acr --admin-enabled true

cd $imgApi
az acr build --image $imgApi --registry $acr --file Dockerfile .
cd ..

cd $imgUI
az acr build --image $imgUI --registry $acr --file Dockerfile .
cd ..
```