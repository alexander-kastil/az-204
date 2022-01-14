# Azure Container Instances & Web Apps for Containers

[Web App for Containers](https://docs.microsoft.com/en-us/azure/app-service/containers/)

[Azure Container Instances](https://docs.microsoft.com/en-us/azure/container-instances/)

[Deploy to Azure Container Instances from Azure Container Registry](https://docs.microsoft.com/en-us/azure/container-instances/container-instances-using-azure-container-registry)

## Azure Container Instances

To read Angular Config from Environments Vars, open project `ng-config-env` and examine `./src/assets` and `./src/environments`

`env.js` is referenced in `index.html`:
```typescript
(function (window) {
  window["env"] = window["env"] || {};
  window["env"].API_URL = "http://localhost:5001/food";
})(this);
```

`environment.ts` references `window['env']`-variables:
```typescript
declare global {
  interface Window {
    env: any;
  }
}

export const environment = {
  production: false,
  apiUrl: window['env'].API_URL,
};
```

`dockerfile` calls `env.transform.js` to update `env.js` with current environment variables:

```bash
CMD ["/bin/sh", "-c", "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
```

`env.transform.js`:
```typescript
(function (window) {
  window["env"] = window["env"] || {};
  window["env"].API_URL = "${ENV_API_URL}";
})(this);
```

Build image and run container:

```bash
docker build --rm -f "dockerfile" -t ng-config-env .
docker tag ng-config-env arambazamba/ng-config-env
docker push arambazamba/ng-config-env
```

>Note: We will use the `arambazamba/ng-config-env`-image for the rest of this module. Update your Docker Hub username.

Run container:

```bash
docker run -d --rm -p 5052:80 ng-config-env --env ENV_API_URL="https://food-api-staging-4591.azurewebsites.net"
http://localhost:5052
```

Execute `create-container-instance.azcli`:

```bash
rnd=$RANDOM
grp=az204-m05-ci-$rnd
loc=westeurope
app=ng-config-env-$RANDOM
img="arambazamba/ng-config-env"

az group create -n $grp -l $loc

az container create -g $grp -l $loc -n $app --image $img --cpu 1 --memory 1 --dns-name-label $app --port 80 --environment-variables 'API_URL'='https://food-api-staging-4591.azurewebsites.net'
```