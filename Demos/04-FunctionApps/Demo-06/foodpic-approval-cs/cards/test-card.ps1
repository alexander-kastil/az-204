$json = Get-Content -Path .\card.json
$uri =  Get-Content -Path .\webhookuri.txt

Invoke-RestMethod -Method post -ContentType 'Application/Json' -Body $json -Uri $uri