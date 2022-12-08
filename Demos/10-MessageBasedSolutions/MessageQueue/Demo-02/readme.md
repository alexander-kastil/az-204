# Scaling a container hosted Azure Function using KEDA

[Azure Container Apps](https://learn.microsoft.com/en-us/azure/container-apps/overview)

- Execute `create-container-app.azcli` to run the demo.

Log Query:

```
ContainerAppConsoleLogs_CL | where ContainerAppName_s == 'queuereader' and Log_s contains 'Message ID' | project Time=TimeGenerated, AppName=ContainerAppName_s, Revision=RevisionName_s, Container=ContainerName_s, Message=Log_s | take 5
```