# Using Cosmos DB and .NET Core

[Cosmos DB Samples](https://docs.microsoft.com/en-us/azure/cosmos-db/sql-api-dotnet-v3sdk-samples)

[LINQ to SQL translation](https://docs.microsoft.com/en-us/azure/cosmos-db/sql-query-linq-to-sql)

## Demo

- Explain base .NET Data Access

- Sample Trigger:

  ```javascript
  function trigger() {
    var context = getContext();
    var request = context.getRequest();
    var item = request.getBody();

    if (!("kitchen" in item)) {
      item["kitchen"] = "unspecified";
    }
    request.setBody(item);
  }
  ```
