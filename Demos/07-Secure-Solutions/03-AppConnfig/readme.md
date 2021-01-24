# App Configuration

[App Configurations Docs](https://docs.microsoft.com/en-us/azure/azure-app-configuration/)

Execute `create-app-conf.azcli` to create required base services.

Get the Connection String of the AppConfig Service and add it as env var:

```powershell
setx AppConfigCS "Endpoint=https://foodconfig-20433.azconfig.io;Id=YhpI-l9-s0:bXPh6ApX2WzFki7odj33;Secret=o8LoLhCIy5Rn3okemD0CkDan4y83rozMR7C8cRz/SECRET="
```

![secret](_images/app-config-con-string.png)

Examine Demo-01 and execute it using `dotnet run`

## Additional Labs & Walkthroughs

[Tutorial: Use dynamic configuration in an ASP.NET Core app](https://docs.microsoft.com/en-us/azure/azure-app-configuration/enable-dynamic-configuration-aspnet-core?tabs=core2x)
