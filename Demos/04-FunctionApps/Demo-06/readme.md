# Using Azure Functions with SharePoint Webhooks

> Note: Sample taken from [here](https://docs.microsoft.com/en-us/sharepoint/dev/apis/webhooks/sharepoint-webhooks-using-azure-functions)

![subscribe](_images/webhook-sample-call-webhook.png)

![process](_images/webhook-sample-async-getchanges.png)

## Demo

- 01-AzureFunct: An Azure Function acting as an endpoint for a SharePoint Webhook
- 02-ReferenceImplementation

### 01-AzureFunct

- Create Az-Funct using `create-func-app.azcli`
- Setup Webhook Subscription using `create-wh-subscription.ps1` & manipulate list.
- Watch logs or queue for change

> Note: If you want to complete this sample follow the PNP Webhook sample implementation @https://docs.microsoft.com/en-us/sharepoint/dev/apis/webhooks/webhooks-reference-implementation
