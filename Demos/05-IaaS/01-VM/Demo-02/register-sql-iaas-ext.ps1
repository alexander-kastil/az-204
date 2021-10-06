$vm="Server2022"
$grp="vm-hosting"
$loc="westeurope"
$subvs="Visual Studio Enterprise"
$subpay= "Dev/Test Pay-As-You-Go"

Get-AzSubscription
Get-AzureSubscription -SubscriptionName $subvs 
Get-AzureSubscription -SubscriptionName $subpay
Select-AzSubscription -SubscriptionName $subpay

# Register your Azure subscription with the Microsoft.SqlVirtualMachine provider
# Register-AzResourceProvider -ProviderNamespace Microsoft.SqlVirtualMachine

Get-AzResourceGroup 

$vm = Get-AzVM -Name $vm -ResourceGroupName $grp

# SqlManagementType: LightWeight | Full
# LicenseType: PAYG | AHUB | DR

New-AzSqlVM -Name $vm.Name -ResourceGroupName $vm.ResourceGroupName -SqlManagementType LightWeight -LicenseType 'PAYG' -Sku Developer -Location $loc

Update-AzSqlVM -Name $vm.Name -ResourceGroupName $vm.ResourceGroupName -SqlManagementType Full -LicenseType 'PAYG' -Sku Developer 