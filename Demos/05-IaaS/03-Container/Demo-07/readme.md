# Azure Container Apps

[Azure Container Apps](https://learn.microsoft.com/en-us/azure/container-apps/)

Register Container Apps Prerequesites:

```bash
az extension add --name containerapp --upgrade
az provider register -n Microsoft.App --wait
az provider register --namespace Microsoft.OperationalInsights --wait
```