# Real-time Angular UI connected to serverless SignalR responding to Events publisehd to EventGrid Topic

[CloudEvent schema](https://docs.microsoft.com/en-us/azure/event-grid/cloudevents-schema)

[SignalR](https://docs.microsoft.com/en-us/azure/azure-signalr)

## Demo

- Event Grid Topic wich is the event bus triggered by `post-order.http`
- Azure SignalR Service providing real-time communication between ui and az function that describes the event
- A function app with that:
  - Acts as an endpoint for the event grid topic webhook subscription using a binding
  - Communicates with the SignalR service
- A real time Micro Frontend `food-orders-ui` implemented in Angular

  ![architecture](_images/architecture.png)

  > Note: The demo is an updated and modernized version of [https://github.com/DavidGSola/serverless-eventgrid-viewer](https://github.com/DavidGSola/serverless-eventgrid-viewer)

### Setup & Steps

Execute `create-foodorder-app.azcli` to provision the environment.

Update SignalR config in environment.ts and environment.prod.ts of `food-orders-ui`:

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
