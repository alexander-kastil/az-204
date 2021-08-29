$json = Get-Content -Path .\card2.json
$uri =  Get-Content -Path .\webhookuri.txt

Invoke-RestMethod -Method post -ContentType 'Application/Json' -Body $json -Uri $uri