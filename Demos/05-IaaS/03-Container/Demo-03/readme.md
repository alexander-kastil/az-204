# Azure Container Registry Build Task

Remove `node_modules` and `.angular` if presen to avoid large package upload to acr

Execute `create-acr-build.azcli`:

```
acr=integrationsonline.azurecr.io
az acr login --name $acr
az acr build --image food-ui:2.0.0 --registry $acr --file ./food-ui/dockerfile .
```