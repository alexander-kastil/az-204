# Node based Functions

[food-utils-api](food-utils-api/) is a utility service that provides the following functions:

- Currency Converter
- Simple Interest Calculator
- A mock function that returns an xml array of mock food items

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

## Http-Trigger - Currency Calculator

- Get your Api Key at [Fixer.io](https://fixer.io/)
- Replace in `create-func-app.azcli` and `local.settings.json`

    ```json
    {
    "IsEncrypted": false,
    "Values": {
        "AzureWebJobsStorage": "UseDevelopmentStorage=true",
        "FUNCTIONS_WORKER_RUNTIME": "node",
        "FixerKey": "YOUR API KEY"
    }
    ```

- Start function app and execute `convert-to.http`