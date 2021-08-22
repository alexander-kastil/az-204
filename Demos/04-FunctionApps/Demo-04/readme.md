# JavaScript Functions

> Note: Using Node 12.x

## Http-Trigger - Simple Interest

- Run `npm run start`

- Test using [Rest Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) and execute `call-get-interest.http` or use curl, az rest, Postman:

    ```json
    POST  http://localhost:7071/api/getInterest HTTP/1.1
    content-type: application/json

    {
        "principal": 100,
        "rate": 10,
        "term": 2
    }
    ```

## Http-Trigger - Currency Calculater

- Get your Api Key at [Fixer.io](https://fixer.io/)
- Replace in `create-func-app.azcli` and `local.settings.json`

    ```json
    {
    "IsEncrypted": false,
    "Values": {
        "AzureWebJobsStorage": "",
        "FUNCTIONS_WORKER_RUNTIME": "node",
        "FixerKey": "YOUR API KEY"
    }
    ```

- Start function app and execute `convert-to.http`