# Cosmos DB Change Feed

[Change feed in Azure Cosmos DB](https://docs.microsoft.com/en-us/azure/cosmos-db/change-feed)

## Demo

- Explain Change Feed basics and start debuggin
- Change food item in `fooddb`

`local.settings.json`:

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "dotnet",
    "conCosmosDB": "AccountEndpoint=https://az204-cosmos-111.documents.azure.com:443/;AccountKey=...;"
  }
}
```