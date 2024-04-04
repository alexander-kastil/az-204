# Run Azure Functions in Azure Container Apps

## Demos

- Create the project:

    ```bash
    func init func-aca --worker-runtime dotnet-isolated --docker
    ```

- Add a hello world function:

    ```bash
    func new --name ACATrigger --template "HTTP trigger" --authlevel "anonymous"
    ```

- Test the function locally:

    ```bash
    func start
    ```