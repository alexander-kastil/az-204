# Build Serverless OData APIs with Azure Functions

- Install packages in [/db-setup](db-setup) and [/products-crud](products-crud) folders

    ```bash
    npm install
    ```

- Run [db-setup/create-db.azcli](db-setup/create-db.azcli) in folder `db-setup` to create the db. It uses `@azure/cosmos` to populate the db with sample data.

- Replace the connection string in `local.settings.json`

    ```json
    {
        "IsEncrypted": false,
        "Values": {
            "AzureWebJobsStorage": "UseDevelopmentStorage=true",
            "FUNCTIONS_WORKER_RUNTIME": "node",
            "CONNECTION_STRING": "YOUR CONNECTION_STRING",
            "dbname": "productsdb"
        },
        "Host": {
            "CORS": "*"
        }
    }
    ```

- Use [products-crud/products-tester.http](products-crud/products-tester.http) to test the api

