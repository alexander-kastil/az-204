# Using Azure Event Hubs to receive Microsoft Graph Change Notifications

[Use the Microsoft Graph API to get change notifications](https://docs.microsoft.com/en-us/graph/api/resources/webhooks?view=graph-rest-1.0)

[Using Azure Event Hubs to receive change notifications](https://docs.microsoft.com/en-us/graph/change-notifications-delivery)

## Demo

Provision Environment using `capture-graph-events.azcli`.

Update notificationUrl in subscription post.

Subscribe using [Microsoft Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer) in an authenticated session.

![subscription](_images/subscription.jpg)

```json
POST https://graph.microsoft.com/v1.0/subscriptions
Content-Type: application/json
{
    "changeType": "created,updated",
    "notificationUrl": "EventHub:https://m10-graphevents-25954.vault.azure.net/secrets/graphConStr?tenantId=integrations.at",
    "resource": "/me/mailfolders('inbox')/messages",
    "expirationDateTime": "2022-05-07T11:00:00.0000000Z",
    "clientState": "SecretClientState"
}
```
- F5 Debug graphProcessor. If time permist re-create it.
