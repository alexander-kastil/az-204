# Install Azure PowerShell - Execute using line by line using selection & F8

Install-Module -Name PowerShellGet -Force
Install-Module -Name Az -AllowClobber

# Login - run this from class ps to see the popup
Connect-AzAccount

$rnd = Get-Random
$VMSize = "Standard_B1ms"
$grp = "az-204-vmgrp-$rnd"

# The credential of the designated Windows Admin - Not your credential :-)
# Use: az204admin PWD: P@$$w0rd1234!
$cred = Get-Credential

New-AzResourceGroup -Name $grp -Location westeurope

New-AzVm -ResourceGroupName $grp -Name "winVM" -Location "westeurope" -VirtualNetworkName "myVnet" -SubnetName "mySubnet" -SecurityGroupName "myNetworkSecurityGroup" -PublicIpAddressName "myPublicIpAddress" -Size $VMSize -OpenPorts 80, 3389 -Credential $cred

# Get IP:

$ip = (Get-AzPublicIpAddress -ResourceGroupName $grp | Select-Object "IpAddress").IpAddress

# Connect to VM - change publicIpAddress

mstsc /v:$ip