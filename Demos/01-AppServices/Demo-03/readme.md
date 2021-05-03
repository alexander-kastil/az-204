# Web App for Containers

- Explain Docker Build
- Execute `create-webapp-container.azcli`

```
rnd=$RANDOM
grp=az204-wacontainers-$rnd
appPlan=wacontainers$rnd
app=foodui-$rnd

az group create --name $grp --location westeurope

az appservice plan create --name $appPlan -g $grp --sku B1 --is-linux --number-of-workers 1

az webapp create -g $grp -p $appPlan -n $app -i arambazamba/foodui
```
