# Azure Container Registry Build Task

Remove `node_modules` and `.angular` if presen to avoid large package upload to acr

Execute `create-acr-build.azcli`:

```bash
acr=integrationsonline.azurecr.io

az acr login --name $acr
az acr build --image ng-config:env --registry $acr --file Dockerfile .
```