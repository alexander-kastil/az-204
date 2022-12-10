# Build Serverless APIs with Azure Functions

- Run `create-db.azcli` in folder `db-setup` to create the db
- Replace the connection string in `local.settings.json`

    ```json
    {
        "IsEncrypted": false,
        "Values": {
            "AzureWebJobsStorage": "",
            "FUNCTIONS_WORKER_RUNTIME": "node",
            "CONNECTION_STRING": "YOUR CONNECTION_STRING",
            "dbname": "productsdb"
        },
        "Host": {
            "CORS": "*"
        }
    }
    ```

- Execute `create-product.http`
- Execute `get-products.http`

