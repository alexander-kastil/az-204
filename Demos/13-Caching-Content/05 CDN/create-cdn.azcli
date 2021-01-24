# rnd=$RANDOM
rnd=007
grp=az204-cdn-$rnd
loc=westeurope
profile=ngprofile
epname=ngendpoint
acct=staticwebsite$rnd
content='/FoodUI/dist/FoodUI/'

# Take from prev script output without https:// and / at the end
pep='staticwebsite007.z6.web.core.windows.net'

az cdn profile create -g $grp --name $profile --sku Standard_Microsoft

az cdn endpoint create -g $grp --name $epname --profile-name $profile --origin $pep --origin-host-header $pep

# Url ReWrite
az cdn endpoint rule add -n $epname -g $grp --profile-name $profile --rule-name sparewrite --order 1 --action-name "UrlRewrite" --source-pattern '/' --destination /index.html --preserve-unmatched-path false --match-variable UrlFileExtension --operator LessThan --match-value 1

# Enforce Https
az cdn endpoint rule add -n $epname -g $grp --profile-name $profile --rule-name enforcehttps --order 2 --action-name "UrlRedirect"  --redirect-type Found --redirect-protocol HTTPS --match-variable RequestScheme --operator Equal --match-value HTTP

# Preload Endpoint on Higher Level SKUs as Replication might take hours

az cdn endpoint load -g $grp -n $epname --profile-name $profile --content-paths $content'index.html'

# Purge 

az cdn endpoint purge -g $grp -n $epname --profile-name $profile --content-paths $content'index.html'