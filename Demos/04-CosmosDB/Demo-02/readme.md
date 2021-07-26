# Using Cosmos DB and .NET Core

- Explain .NET Data Access
- Show Linq Sample
- Explain Trigger

[LINQ to SQL translation](https://docs.microsoft.com/en-us/azure/cosmos-db/sql-query-linq-to-sql)

## Demo

```javascript
function trigger() {
  var context = getContext();
  var request = context.getRequest();
  // this is the current request
  var itemToCreate = request.getBody();
  // item might need attention
  if ("Promotion" in itemToCreate) {
    itemToCreate["Discontinued"] = true;
  }
  // update the current request
  request.setBody(itemToCreate);
}
```
