# Environment Setup, Debugging & State Management

This modules demonstrates how to code & debug a Dapr based microservices as well as to deploy it to Azure Container Apps. It is based on the [Dapr quickstarts](https://docs.dapr.io/getting-started/quickstarts/). 

- [food-api-dapr](./food-api-dapr/) - A .NET Core Web API project that uses State Management to store and retrieve state. 

- Make sure Dapr is initialized and running

    ```bash
    dapr init
    ```
- Run the project:

    ```bash
    dapr run --app-id food-api --app-port 5000 --dapr-http-port 5010 --resources-path './components' dotnet run
    ```