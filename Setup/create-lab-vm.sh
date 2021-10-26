rnd=$RANDOM
loc=westeurope
grp=az-lab
vmname=labvm-$rnd
user=azlabadmin
pwd=Lab@dmin1234
vault=labvault-$rnd

az group create -n $grp -l $loc

az vm create -g $grp -n $vmname --admin-username $user --admin-password $pwd --image  MicrosoftWindowsDesktop:Windows-10:21h1-pro:19043.1237.2109130412 --size Standard_E2s_v3 --public-ip-sku Standard

az vm auto-shutdown -g $grp -n $vmname --time 1830

# Enable Azure AD Login
az vm extension set --publisher Microsoft.Azure.ActiveDirectory --name AADLoginForWindows -g $grp --vm-name $vmname

username=$(az account show --query user.name --output tsv)

az role assignment create --role "Virtual Machine Administrator Login" --assignee $username --scope $vmname
