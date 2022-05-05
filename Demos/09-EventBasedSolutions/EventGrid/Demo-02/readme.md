# Real-time Angular UI connected to serverless SignalR responding to Events publisehd to EventGrid Topic

[CloudEvent schema](https://docs.microsoft.com/en-us/azure/event-grid/cloudevents-schema)

[SignalR](https://docs.microsoft.com/en-us/azure/azure-signalr)

## Demo

Demo is an updated and modernized version of [https://github.com/DavidGSola/serverless-eventgrid-viewer](https://github.com/DavidGSola/serverless-eventgrid-viewer)

![architecture](_images/architecture.png)

Execute `create-foodorder-app.azcli`. It creates:

- Azure SignalR Service
- Event Grid Topic
- Publishes Function app with that acts as an endpoint for the event grid topic webhook subscription
- Adds the Angular Url to CORS and sets `Enable Access-Control-Allow-Credentials` to true
- A real time FoodOrders UI implemented in Angular

Update signalr config in environment.ts and environment.prod.ts of `ng-food-log`:

```typescript
export const environment = {
  production: false,
  fxEndpoint: 'https://foodorders-7325.azurewebsites.net/api',
};
```

Test using `post-order.http` by updating `@topicurl` and `@topickey`:

```
@topicurl=foodtopic-prod.westeurope-1.eventgrid.azure.net
@topickey=C1q1BdqhPGsNsmy5wBzjtsgTTN1u2GbiffNoU8EJlcM=

POST  https://{{topicurl}}//api/events HTTP/1.1
content-type: application/cloudevents+json; charset=utf-8
aeg-sas-key: {{topickey}}

{ ...
```
