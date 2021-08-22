# JavaScript Functions

## Http-Trigger - Simple Interest

Run:

```
npm run start
```

Test using [Rest Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) or use curl, az rest, Postman:

```
POST  http://localhost:7071/api/getInterest HTTP/1.1
content-type: application/json

{
    "principal": 100,
    "rate": 10,
    "term": 2
}
```

> Note: Using Node 12.x
