Install-Module SharePointPnPPowerShellOnline -SkipPublisherCheck -AllowClobber

Connect-PnPOnline https://integrationsonline.sharepoint.com/sites/M365Dev	

# "testwebhook" is the name of our target list	

Add-PnPWebhookSubscription –List News –NotificationUrl https://webhookfx-007.azurewebsites.net/api/processList	

# List Webhook Subscriptions
Get-PnPWebhookSubscriptions -List News

# We can also remove the subscription with the following Cmdlet
Remove-PnPWebhookSubscription –List  testwebhook –Identity 4c42887b-8816-4151-aea2-bb1780a2032b