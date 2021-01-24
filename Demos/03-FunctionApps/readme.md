# Function Apps

[Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/functions-overview)

[Azure Functions Reference](https://docs.microsoft.com/en-gb/azure/azure-functions/functions-reference)

[host.json Reference](https://docs.microsoft.com/en-us/azure/azure-functions/functions-host-json)

[Triggers & Binding](https://docs.microsoft.com/en-us/azure/azure-functions/functions-triggers-bindings)

[Register Bindings](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-register)

[Azure Durable Functions Documentation](https://docs.microsoft.com/en-us/azure/azure-functions/durable/)

## CLI Reference

[az functionapp](https://docs.microsoft.com/en-us/cli/azure/functionapp?view=azure-cli-latest)

## Extensions

[Azure Functions](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions)

## Azure Functions Core Tools

Install Azure Functions Core Tools:

```
npm i -g azure-functions-core-tools@3 --unsafe-perm true
```

or

```
choco install azure-functions-core-tools-3 --params="'/x64:true'" -y
```

[Work with Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=windows%2Ccsharp%2Cbash#v2)

## Testing

To Execute REST Calls you could use:

- httprepl
- [az rest](https://docs.microsoft.com/en-us/cli/azure/reference-index?view=azure-cli-latest#az_rest)
- Postman

Install httprepl:

```
dotnet tool install -g Microsoft.dotnet-httprepl
```

For [Storage Account Testing and Emulation](https://docs.microsoft.com/en-us/azure/storage/common/storage-use-emulator) download the [Local Storage Account Emulator](https://go.microsoft.com/fwlink/?linkid=717179&clcid=0x409)

## Durable Functions

[Azure Functions Durable Extensions](https://github.com/Azure/azure-functions-durable-extension)

Install Durable Functions Package into a specific project:

```
func extensions install -p Microsoft.Azure.WebJobs.Extensions.DurableTask -v 2.4.0
```

or

```
dotnet add package Microsoft.Azure.WebJobs.Extensions.DurableTask --version 2.4.0
```

## Additional Labs & Walkthroughs

[Create serverless applications](https://docs.microsoft.com/en-us/learn/paths/create-serverless-applications/)
