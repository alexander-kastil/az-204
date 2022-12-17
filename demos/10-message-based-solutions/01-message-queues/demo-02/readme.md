# Scaling a container hosted Azure Function using KEDA

[Azure Container Apps](https://learn.microsoft.com/en-us/azure/container-apps/overview)

[Set scaling rules in Azure Container Apps using KEDA](https://learn.microsoft.com/en-us/azure/container-apps/scale-app#event-driven)

## Demo

- `keda-scaling.azcli` contains all required steps to deploy the demo

- Examine `./food-payments` Azure Function that will run in a container. It mocks a long running process by sleeping for 500ms and is triggered by a message in a queue.

    ```c#
    [FunctionName("processPayment")]
    public static async Task RunAsync([QueueTrigger("food-orders", Connection = "PaymentConnectionString")] string item, Binder binder, ILogger log)
    {
        log.LogInformation($"Processing Payment for item: {item}");
        // Delay mock to simulate complex processing
        var sleep = Int32.Parse(Environment.GetEnvironmentVariable("Sleep"));
        if (sleep > 0)
        {
            System.Threading.Thread.Sleep(sleep);
        }
        ...
    }
    ```
    >Note: You can also examin the `./food-payments/Dockerfile` to understand details of the container image creation. You have to provide a valid connection string

- Create a storage account with a queue, a container for the generated invoices and get its connection string

    ```bash
    az storage account create -n $acct -g $grp --kind StorageV2 --sku Standard_LRS
    key=$(az storage account keys list -n $acct --query "[0].value")
    az storage container create --account-name $acct --account-key $key --name $blobcontainer
    az storage queue create -n $queue --account-key $key --account-name $acct
    storageConStr=$(az storage account show-connection-string -n $acct -g $grp --query connectionString -o tsv)
    ```

- Test the container localy    

    ```bash
    messageOne=$(echo "Hello Queue Reader App" | base64)
    az storage message put --content $messageOne --queue-name $queue 
        \--connection-string $queueConStr
    docker run -d --rm -p 5052:80 -e "PaymentConnectionString=<CONNECTION_STRING>" -e "Sleep=500" -e "APPINSIGHTS_INSTRUMENTATIONKEY=<AI_Key>" food-payments
    ```

    >Note: You can check the state of the queue using the Azure Portal or the Azure CLI

- Create container app environment and deploy a container to it:

    ```bash
    az containerapp env create -n $contaienrenv -g $grp --location $loc

    az deployment group create -g $grp --template-file $arm --parameters \
        environment_name=$contaienrenv \
        queueconnection=$queueConStr \
        location=$loc
    ```

- Send a bunch of messages to the queue using `./queue-prducer`. Wait until all messages have been processed before proceeding to the next step.
   
- Create a Log Query and exmaine the behavior of the container app instances:

    ```sql
    ContainerAppConsoleLogs_CL | where ContainerAppName_s == 'queuereader' and Log_s contains 'Message ID' | project Time=TimeGenerated, AppName=ContainerAppName_s, Revision=RevisionName_s, Container=ContainerName_s, Message=Log_s | take 5
    ```