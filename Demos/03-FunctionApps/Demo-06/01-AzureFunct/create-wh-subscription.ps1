$site="https://integrationsonline.sharepoint.com/sites/M365Dev";
$list="Skills"

# replace with value from create-func-app.azcli if you have deployed your function app to Azure
# $funcapp="m365dev-webhook-46";
# $url="https://$($funcapp).azurewebsites.net/api/spwebhook"

# use this for ngrok version
$url="https://58d961eeb11f.ngrok.io/api/spwebhook"

Install-Module SharePointPnPPowerShellOnline -SkipPublisherCheck -AllowClobber -Force

Connect-PnPOnline $site	

Add-PnPWebhookSubscription –List $list –NotificationUrl $url -ExpirationDate "2021-06-06"

Get-PnPWebhookSubscriptions -List $list

# do not forget to delete your webhook subscription
Remove-PnPWebhookSubscription –List  testwebhook –Identity 1c2f507d-e2a5-42db-88bf-cf2ba78d0b4e