# Durable Functions

[Azure Functions Durable Extensions](https://github.com/Azure/azure-functions-durable-extension)

Install Durable Functions Package into a specific project:

```
func extensions install -p Microsoft.Azure.WebJobs.Extensions.DurableTask -v 2.4.0
```

or

```
dotnet add package Microsoft.Azure.WebJobs.Extensions.DurableTask --version 2.4.0
```

## Demo

-   Execute `create-durable-func.azcli`
-   Create new Proj using function core tools or azure funct extension
-   Install durable functions npm package: `npm i -S durable-functions@1.4.0`
-   Explain HttpStarter, Orchestrator, Activity
-   ShowDebugging: Hit F5 & execute Request: http://localhost:7071/api/orchestrators/OrchestratorJS

Complete Guide:

[Durable Functions Walkthrough](https://docs.microsoft.com/en-us/azure/azure-functions/durable/quickstart-js-vscode)
