# Using Managed Identities & Service Connectors to access Azure resources

- Build the image and push it to ACR:

    ```bash
    env=dev
    acr=aznativecontainers$env
    img=$acr.azurecr.io/kv-api:v2
    az acr build --image $img --registry $acr --file dockerfile .
    ```

- Execute [create-kv-app-sc.azcli](create-kv-app-sc.azcli)

- Create the service connection manually
