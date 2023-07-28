# Azure Container Instances (ACI)

[Azure Container Instances](https://learn.microsoft.com/en-us/azure/container-instances/)

## Demo

Deploy Api:

```
az container create -g $grp -l $loc -n $apiapp --image $apiImg  \
    --cpu 1 --memory 1 --dns-name-label $apiapp --port 80 \
    --registry-password $pwd --registry-username $acr \ 
    --registry-login-server $loginSrv
```

Deploy UI and inject api url:

```
az container create -g $grp -l $loc -n $uiapp --image $uiImg  \
    --cpu 1 --memory 1 --dns-name-label $uiapp --port 80 
    --registry-password $pwd --registry-username $acr \
    --registry-login-server $loginSrv \
    --environment-variables ENV_API_URL=https://$apiUrl
```