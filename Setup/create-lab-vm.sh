rnd=$RANDOM
loc=westeurope
grp=az-lab
vmname=labvm-$rnd
user=azlabadmin
pwd=Lab@dmin1234

az group create -n $grp -l $loc

az vm create -g $grp -n $vmname --admin-username $user --admin-password $pwd --image  MicrosoftWindowsDesktop:Windows-10:win10-21h2-pro-g2:latest --size Standard_E2s_v3 --public-ip-sku Standard

az vm auto-shutdown -g $grp -n $vmname --time 1830
