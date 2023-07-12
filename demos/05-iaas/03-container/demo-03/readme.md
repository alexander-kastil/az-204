# Azure Container Registry Build Task

Remove existing `node_modules` and `.angular` folders in `config-ui`, if present to reduce upload time to Azrue container registry.

Execute `create-acr-build.azcli`:

```bash
acr=integrationsonline.azurecr.io

az acr login --name $acr
az acr build --image ng-config --registry $acr --file Dockerfile .
```