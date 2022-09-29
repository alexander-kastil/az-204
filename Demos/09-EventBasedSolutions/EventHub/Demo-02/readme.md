# Using Azure Event Hubs to receive Microsoft Graph Change Notifications

[Use the Microsoft Graph API to get change notifications](https://docs.microsoft.com/en-us/graph/api/resources/webhooks?view=graph-rest-1.0)

[Using Azure Event Hubs to receive change notifications](https://docs.microsoft.com/en-us/graph/change-notifications-delivery)

## Demo

- Provision Environment using `capture-graph-events.azcli`.

- Update notificationUrl in subscribe-change-notification.http:

    ```
    @notificationUrl="https://m10-graphevents-23196.vault.azure.net/secrets/graphConStr?tenantId=integrations.at"
    ...
    POST https://graph.microsoft.com/v1.0/subscriptions HTTP/1.1
    Authorization: Bearer {{auth.response.body.access_token}}
    Content-Type: application/json

    {
        "changeType": "created,updated",
        "notificationUrl": {{notificationUrl}},
        "resource": "/me/mailfolders('inbox')/messages",
        "expirationDateTime": "2022-05-07T11:00:00.0000000Z",
        "clientState": "SecretClientState"
    }
    ```
    >Note: As alternative to REST Client subscribe using [Microsoft Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer) in an authenticated session.

    ![subscription](_images/subscription.jpg)

- Update in EventHubKey of local.settings.json in graph-processor: 

    ```json
    {
        "IsEncrypted": false,
        "Values": {
            "AzureWebJobsStorage": "UseDevelopmentStorage=true",
            "FUNCTIONS_WORKER_RUNTIME": "dotnet",
            "EventHubKey": "<KEY>"
        }
    }
    ```

- F5 Debug the function app `graph-processor` in a new code instance.

- Send yourself an email.
