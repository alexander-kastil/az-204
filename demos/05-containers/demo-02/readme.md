# Azure Container Registry

[Azure Container Registry](https://docs.microsoft.com/en-us/azure/container-registry/)

## Demos

Publish to ACR:

Execute `create-container-reg` and upload:

```
docker tag foodui foodacr-1234.azurecr.io/foodui:1.1.0
docker push foodacr-1234.azurecr.io/foodui:1.1.0
```
