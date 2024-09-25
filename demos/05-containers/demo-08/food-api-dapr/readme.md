# Run Demo

- Make sure Dapr is initialized and running

    ```bash
    dapr init
    ```
- Run the project:

```bash
dapr run --app-id food-api --app-port 5000 --dapr-http-port 5010 --resources-path './components' dotnet run
```