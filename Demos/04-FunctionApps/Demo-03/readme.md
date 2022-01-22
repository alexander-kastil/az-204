# Introduction to Bindings using Blob Storage

[Azure Functions triggers and bindings concepts](https://docs.microsoft.com/en-us/azure/azure-functions/functions-triggers-bindings)

[Register Bindings](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-register)

## Demo

Start Azurite im command prompt:

```
Azurite
```

Provision function app by executing `create-bindings-app.azcli`

## Managing Function Extensions

Install [function extensions](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-register#access-extensions-in-non-net-languages):

```
func extensions install
```

Install Azure Functions Extensions:

```
dotnet add package Microsoft.Azure.Functions.Extensions --version 4.0.5
```
Install a specific extension

```
func extensions install --package Microsoft.Azure.WebJobs.Extensions.Storage --version 4.0.5
```
