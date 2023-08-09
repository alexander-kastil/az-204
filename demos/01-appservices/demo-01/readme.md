# Create App Service & Publish .NET Core Api using Portal & CLI

- Using VS Extension
- Publishing Profile
- az webapp up

## Scaffold App & Deploy using Azure App Service Extensions

Use [.NET Core CLI](https://docs.microsoft.com/en-us/dotnet/core/tools/). 

Scaffold and run App:

```bash
dotnet new mvc -n mvc-app -f net6.0
dotnet run
```

Publish app

```bash
dotnet publish
```

Execute `create-mvc-app.azcli` to create App Service Plan & App Service

Deploy App using [Azure App Service](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice)

![deploy](_images/deploy-ext.jpg)

## Deploy using Publishing Profile

Navigate to `./publishing-profile/Properties/PublishProfile`

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

## Deploy food-catalog-api using az webapp up

[food-catalog-api](/app/food-catalog-api/) is a .NET Core Api. Deploy it using [az webapp up](https://docs.microsoft.com/en-us/cli/azure/webapp?view=azure-cli-latest#az_webapp_up)

```bash
env=dev
loc=westeurope
grp=foodapp-$env
plan=foodplan-$env
app=food-catalog-api-appservice-$env

az group create -n $grp -l $loc
az webapp up -n $app -g $grp -p $plan --sku F1 -l $loc --runtime "dotnet:6"
```

![az-webapp-up](_images/az-webapp-up.png)

# Deployment using GitHub Actions

- Execute `create-webapp.azcli`

Demo Steps:

- Creat App Service Plan & Deploy Api using GitHub Actions
- Swap Slots

> Note: [https://github.com/arambazamba/food-app](https://github.com/arambazamba/food-app)

Deploy Api using [GitHub Actions](https://github.com/Azure/actions) and fix the path in the [DOTNET CLI](https://docs.microsoft.com/en-us/dotnet/core/tools/) tasks in order to avoid path issues becaus of monorepo-pattern.

Your workflow file, execpt the connection info should look like this:

```yaml
name: Build and deploy ASP.Net Core app to Azure Web App - foodapi-007

on:
  push:
    branches:
      - master

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@master

      - name: Set up .NET Core
        uses: actions/setup-dotnet@v1
        with:
          dotnet-version: "6.0.x"

      - name: Build with dotnet
        run: dotnet build ${{ github.workspace }}/apps/catalog-api/api/catalog-api.csproj --configuration Release

      - name: dotnet publish
        run: dotnet publish ${{ github.workspace }}/apps/catalog-api/api/catalog-api.csproj -c Release -o ${{env.DOTNET_ROOT}}/api
                        
      - name: Deploy to Azure Web App
        uses: azure/webapps-deploy@v2
        with:
          app-name: ${{ env.Appservice }}
          publish-profile: ${{ secrets.CATALOG_API_PROFILE }}
          package: ${{env.DOTNET_ROOT}}/api
```
