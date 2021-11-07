# Create App Service & Publish .NET Core Api using Portal & CLI

## Scaffold App & Deploy using Azure App Service Extensions

Use [.NET Core CLI](https://docs.microsoft.com/en-us/dotnet/core/tools/). 

Scaffold and run App:

```bash
dotnet new api -n CliApi
dotnet run
```

Publish app

```bash
dotnet publish
```

Deploy App using [Azure App Service](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice)

![deploy](_images/deploy-ext.jpg)

## Deploy using Publishing Profile

Demo uses [MVC-DevOps](https://github.com/arambazamba/mvc-devops) sample.

Navigate to `./MVC-Skills/Properties/PublishProfile`

Add a file called `azure.pubxml` with the following content:

```xml
<Project>
    <PropertyGroup>
    <PublishProtocol>Kudu</PublishProtocol>
    <PublishSiteName>{Your App name}</PublishSiteName>
    <UserName>{Your FTP/deployment username}</UserName>
    <Password>{Your FTP/deployment password}</Password>
    </PropertyGroup>
</Project>
```

Get the publishing metadata to update `azure.pubxml`:

```
user=$(az webapp deployment list-publishing-profiles -g $grp -n $mvcapp --query [1].userName -o tsv)
pwd=$(az webapp deployment list-publishing-profiles -g $grp -n $mvcapp --query [1].userPWD -o tsv)

echo "Update your publishing Profile:"
echo "PublishSiteName: $mvcapp"
echo "UserName: $user"
echo "Password: $pwd"
```

Publish app:

```
dotnet publish /p:Configuration=Release /p:PublishProfile=Properties\PublishProfiles\azure.pubxml /p:Password=<password>
```

> Note: Make sure you use the published path

## Deploy using az webapp up

Create an app service plan and a web app:

```bash
rnd=$RANDOM
grp=az204-m01-appservices-$rnd
loc=westeurope
appPlan=appservices-$rnd
app=blazorapp-$rnd
az group create -n $grp -l $loc
az appservice plan create -n $appPlan -g $grp --sku Free
az webapp create -n $app -g $grp --plan $appPlan --runtime "DOTNET|5.0"
```

`az webapp up` is a shortcut to, build, publishes and deploys the web app. Navigate to `./blazor-wasm-app/` and execute:


```bash
rnd=$RANDOM
grp=az204-m01-appservices-$rnd
loc=westeurope
appPlan=appservices-$rnd
app=blazorapp-$rnd

az group create -n $grp -l $loc
az webapp up -n $app -g $grp -p $appPlan -l $loc --sku Free -r "DOTNET|5.0"
```

![az-webapp-up](_images/az-webapp-up.png)
