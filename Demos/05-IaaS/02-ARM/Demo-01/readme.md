# Using ARM Templates

## Deploy template from the command line:

```
rnd=$RANDOM
loc=westeurope
grp=az204-deploy-arm-$rnd
acctname=armstorage$rnd
```

Upload azuredeploy.json to Cloud Shell or ls ...

```
az group create -n $grp -l $loc
az deployment group create -g $grp -n rollout1  --template-file azuredeploy.json --parameters storageAcctName=$acctname
```

> Note: If you are using VSCode Bash in Cloud Shell you will need to upload `azuredeploy.json` manually. An alternative is provided in this [post](https://microsoft.github.io/AzureTipsAndTricks/blog/tip127.html)

## Deploy template from the git:

[Try this template](https://azure.microsoft.com/de-de/resources/templates/201-encrypt-running-windows-vm/)

```
az deployment group create -g az204-git-$RANDOm -n winVM --template-uri https://raw.githubusercontent.com/azure/azure-quickstart-templates/master/201-encrypt-running-windows-vm/azuredeploy.json
```
