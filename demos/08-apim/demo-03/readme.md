# Sending Mock Responses using Policies

[API Management Policies](https://docs.microsoft.com/en-us/azure/api-management/api-management-policies)

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