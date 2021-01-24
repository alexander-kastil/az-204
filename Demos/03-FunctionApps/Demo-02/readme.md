# Azure Function Core Tools

Install azure-function-tools:

```
npm i -g azure-functions-core-tools
npm i -g azure-functions-core-tools@3
```

> Note: Documentaion can be found on [Github](https://github.com/Azure/azure-functions-core-tools) or on [Work with Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=windows%2Ccsharp%2Cbash)

Scaffold Project:

```
func init vscode-functs --dotnet
cd vscode-functs
```

> Note: Choose "yes" in init for VS Code Popup

![init-vscode](../_images/init-vscode.png)

# VS Code Function Apps

Provision required Services:

Create Funtion App in Azure manually or using `create-func-app.azcli`

Create a new Function:

```
func new --name MyHttpTrigger --template "HttpTrigger"
```

Run function locally:

```
func start --build
```

or use host keyword requried in v1

```
func host start --build
```

Execute in another terminal:

```bash
az rest -m post -u http://localhost:7071/api/MyHttpTrigger -b "{'name':'Azure Rocks'}"
```

Publish App to Azure using CLI

```
func azure functionapp publish vscodeapp-7179
```
