# Azure Container Registry Build Task

## Config-api & Config-ui - Simple 2-tier app

Remove existing `node_modules` and `.angular` folders in `config-ui`, if present to reduce upload time to Azrue container registry.

Execute [publish-containers.azcli](publish-images.azcli) in the current folder:

```bash
env=dev
grp=az204-m05-containers
loc=westeurope
acr=az204demos$env
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