# Bindings

[Azurite. An open source Azure Storage API compatible server (emulator)](https://marketplace.visualstudio.com/items?itemName=Azurite.azurite)

## Demo

Start Azurite im command prompt:

```
Azurite
```

Provision function app by executing `create-bindings-app.azcli`

## Function Extensions

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
