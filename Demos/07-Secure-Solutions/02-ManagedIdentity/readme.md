# Managed Identity

[Azure Instance Metadata Servicen for Virtual Machiness](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/instance-metadata-service)

[Configure managed identities for Azure resources on an Azure VM using Azure CLI](https://docs.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/qs-configure-cli-windows-vm)

Retriev Token:

```
curl -H Metadata:true "http://169.254.169.254/metadata/identity/oauth2/token?api-version=2018-02-01&resource=https://valut.azure.net&client_id=<clientid>"
```

> Note: A more practical demo is part of the "AppConfig" module

## Additional Labs & Walkthroughs

[Authenticate apps to Azure services by using service principals and managed identities for Azure resources](https://docs.microsoft.com/en-us/learn/modules/authenticate-apps-with-managed-identities/)
