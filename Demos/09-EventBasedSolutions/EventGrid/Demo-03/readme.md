# Real-time EventGrid viewer with serverless SignalR

Demo is an updated and modernized version of [https://github.com/DavidGSola/serverless-eventgrid-viewer](https://github.com/DavidGSola/serverless-eventgrid-viewer)

![architecture](_images/architecture.png)

### Provisioning

Execute `create-ressources.azcli`. It creates:

- Azure SignalR Service
- Application Insights 
- Function app with EventGrid binding
- Food Angular UI


### Angular UI: food-ui

Update signalr config in environment.ts and environment.prod.ts:

```typescript
export const environment = {
  production: true,
  authEnabled: false,
  apiUrl: 'https://localhost:5001/',
  azure: {
    applicationInsights: 'a196d36f-1782-4da4-8f95-a80585361df7',
    signalr: 'https://foodhub-8926.azurewebsites.net/api',
```