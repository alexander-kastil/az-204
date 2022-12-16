# Scaling a container hosted Azure Function using KEDA

[Azure Container Apps](https://learn.microsoft.com/en-us/azure/container-apps/overview)

[Set scaling rules in Azure Container Apps using KEDA](https://learn.microsoft.com/en-us/azure/container-apps/scale-app#event-driven)

## Demo

- `keda-scaling.azcli` contains all required steps to deploy the demo

- Examine `./queue-processor` Azure Function that will run in a container. It mocks a long running process by sleeping for 500ms and is triggered by a message in a queue.

    ```c#
    [FunctionName("processQueue")]
    public void Run([QueueTrigger("scaling-queue", Connection = "QueueConnectionString")]string item, ILogger log)
    {
        System.Threading.Thread.Sleep(500);
        log.LogInformation($"C# Queue trigger function processed: {item}");
    }
    ```
    >Note: You can also examin the `./queue-processor/Dockerfile` to understand details of the container image creation.

- Create queue and get its connection string

    ```bash
    az storage account create -n $acct -g $grp --kind StorageV2 --sku Standard_LRS
    key=$(az storage account keys list -n $acct --query "[0].value")
    az storage queue create -n $queue --account-key $key --account-name $acct
    queueConStr=$(az storage account show-connection-string -n $acct -g $grp --query connectionString -o tsv)
    ```

- Test the container localy    

    ```bash
    messageOne=$(echo "Hello Queue Reader App" | base64)
    az storage message put --content $messageOne --queue-name $queue 
        \--connection-string $queueConStr
    docker run -d --rm -p 5052:80 -e "QueueConnectionString="$queueConStr queueprocessor
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