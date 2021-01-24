# .NET Data Access and Trigger

- Explain .NET Data Access
- Explain Trigger

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
