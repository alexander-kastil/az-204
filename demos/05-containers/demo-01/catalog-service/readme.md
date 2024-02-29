# Catalog Service

| .NET Api Services         | Http Port | Https Port | Dapr Port | Dapr App ID          | Docker Port|
| -------                   | --------- | ---------- | --------- | -------------        | -----      |
| Catalog Service           | 5001      | 5021       | 5011      | catalog-service      | 5051       |

- Docker Build & Run: 

    ```bash
    docker build --rm -f dockerfile -t catalog-service .
    docker run -it --rm -p 5054:8080 catalog-service
    ```

- Environment Variables:
    - ApplicationInsights__ConnectionString
    - GraphCfg__TenantId
    - GraphCfg__ClientId
    - GraphCfg__ClientSecret    

- Rest Tester:

    ```bash
    POST http://localhost:5004/send HTTP/1.1
    Content-Type: application/json

    {
        "subject": "A test mail",
        "text": "Explore - Let life surprise you!",
        "recipient": "alexander.pajer@integrations.at"
    }
    ```

- Dapr Run & Test:

    ```bash
    dapr run --app-id catalog-service --app-port 5001 --dapr-http-port 5011 --resources-path ./components -- dotnet run
    ```
    
    ```bash
    dapr invoke --app-id catalog-service --method pubsub-test --data '{\"id\": \"1\", \"subject\": \"Explore - Let life surprise you!\" }'
    ```   

    ```bash
     dapr publish --publish-app-id catalog-service --pubsub 'food-pubsub" --topic "catalog-requests" --data "{\"subject\": \"A test mail\", \"text\": \"Explore - Let life surprise you!\", \"recipient\": \"alexander.pajer@integrations.at"}'
    ```   