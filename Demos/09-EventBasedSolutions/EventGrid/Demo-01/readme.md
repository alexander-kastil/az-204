# Consume custom Event

- Execute `create-topic.azcli` to create `foodorder-topic-$RND` topic and function app
- Update values in publish-order-topic/Program.cs

    ```bash
    echo '** Update in publish-order-topic/Program.cs:'
    echo '** Topic: ' $topic
    echo '** Topic Key: ' $key
    ```
- Deploy `ConsumeTopic` app to function app
- Create Event Grid Subscription in the published function app

    ![sub](../_images/event-grid-sub.png)

> Note: Local Debugging can be done using ngrok ... For further details read this [article](https://docs.microsoft.com/en-us/azure/azure-functions/functions-debug-event-grid-trigger-local)
