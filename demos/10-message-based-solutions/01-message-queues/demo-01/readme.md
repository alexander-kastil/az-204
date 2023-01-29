# Azure Queue Storage

## Demo

- Execute `create-queue.azcli` to create a storage account and queue
- Explain `queue-producer` and `queue-consumer`
- Update local.settings.json with the connection string

    ```json
    {
        "IsEncrypted": false,
        "Values": {
            "AzureWebJobsStorage": "UseDevelopmentStorage=true",
            "FUNCTIONS_WORKER_RUNTIME": "dotnet",
            "QueueConnectionString": "<QueueConnectionString>"
        }
    }
    ```

## Readings

[Azure Queue Storage](https://docs.microsoft.com/en-us/azure/storage/queues/)

[Quickstarts - Available for different frameworks](https://docs.microsoft.com/en-us/azure/storage/common/storage-samples-java?toc=/azure/storage/queues/toc.json)

## CLI Reference

[az storage queue](https://docs.microsoft.com/en-us/cli/azure/storage/queue?view=azure-cli-latest)
