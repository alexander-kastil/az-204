$env = "dev"
$grp = "az204-m01-appservices-$env"
$loc = "westeurope"
$plan = "appservices-$env"
$planLinux = "appservices-$env-linux"

az group create -n $grp -l $loc
az appservice plan create -n $plan -g $grp --sku F1
az appservice plan create -n $planLinux -g $grp --sku F1 --is-linux

az webapp create -n "mvcapp-$(Get-Random)" -g $grp -p $plan -r "dotnet:9"

cd net-api
az webapp up -n "net-api-$(Get-Random)" -g $grp -p $plan -l $loc -r "dotnet:9"
cd ..

cd node-express-api
az webapp up -n "node-express-api-$(Get-Random)" -g $grp -p $planLinux -l $loc -r "node|18-lts"
cd ..