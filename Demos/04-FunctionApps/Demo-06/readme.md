# Durable Functions

[Azure Durable Functions Documentation](https://docs.microsoft.com/en-us/azure/azure-functions/durable/)

[Durable Function HTTP API reference](https://docs.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-http-api)

[Developer's guide to durable entities in .NET](https://docs.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-dotnet-entities)

## Demos 

### Stateful Durable Function

Functions in project `stateful-cs`:

![stateful-functs](_images/stateful-functs.png)

`local.settings.json`:

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "dotnet",
    "FUNCTIONS_V2_COMPATIBILITY_MODE": true
  }
}
```

## Durable Prerequisites

[Azure Functions Durable Extensions](https://github.com/Azure/azure-functions-durable-extension)

> Note: Search on NuGet for other [WebJobs.Extensions](https://www.nuget.org/packages?q=Microsoft.Azure.WebJobs.Extensions) you could use in your functions project.

### Install Durable Functions Package into a specific project:

.NET / C#:

```powershell
dotnet add package Microsoft.Azure.WebJobs.Extensions.DurableTask --version 2.5.1
```

Node (JavaScript / TypeScript): 

```powershell
npm i -S durable-functions@1.5.1
```
## Durable Functions Management

[Manage instances in Durable Functions in Azure](https://docs.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-instance-management?tabs=csharp)

Query all instances:

```powershell
func durable get-instances
```

Terminate instance:

```powershell
func durable terminate --id 0ab8c55a66644d68a3a8b220b12d209c --reason "Found a bug"
```

Purge instance history:

```powershell
func durable purge-history 
func durable purge-history --created-before 2021-11-14T19:35:00.0000000Z --runtime-status failed
```
## Tools & Extensions

[Durable Functions Monitor](https://marketplace.visualstudio.com/items?itemName=DurableFunctionsMonitor.durablefunctionsmonitor)

[GitHub: Durable Functions Snippets](https://github.com/marcduiker/durable-functions-snippets)

