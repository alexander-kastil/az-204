# Api Management

- Create & Deploy Api & Azure Function using `create-apimgmt.azcli`
- Create Api Management Instance `create-apim.azcli`
- Apply outgoing [Json Policy](https://github.com/MicrosoftDocs/azure-docs/blob/master/articles/api-management/api-management-transformation-policies.md#ConvertXMLtoJSON)


## Demo

Payment Function:

```typescript
module.exports = async function (context, req) {
    context.log('Executing payment');   
    const responseMessage = { "paymentRequest": "pending", "transactionID": '0284e06a-47f3-42cb-85a8-ae2fa0075132'}
    context.res = {
        body: responseMessage
    };
}
```
Mock Payment Status:

```json
{
    "trainsactionID": "0284e06a-47f3-42cb-85a8-ae2fa0075132",
    "status": "completed"
}
```