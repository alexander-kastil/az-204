# Creating VMs

Examine available Images using `list-vm-iamges.azcli`

## Windows

Create Windows VM using Azure CLI & Powershell:

To create a Windows VM execute `create-win-vm.azcli` & `create-win-vm.ps1`

### VM Extensions

#### AADLoginForWindows 

[Login to Windows virtual machine in Azure using Azure Active Directory](https://docs.microsoft.com/en-us/azure/active-directory/devices/howto-vm-sign-in-azure-ad-windows)
##### Install SQL IaaS Agent Extension

[Register SQL Server VM with SQL IaaS Agent Extension](https://docs.microsoft.com/en-us/azure/azure-sql/virtual-machines/windows/sql-agent-extension-manually-register-single-vm?tabs=bash%2Cazure-cli)

[New-AzSqlVM](https://docs.microsoft.com/en-us/powershell/module/az.sqlvirtualmachine/new-azsqlvm?view=azps-6.4.0)

[az sql vm](https://docs.microsoft.com/en-us/cli/azure/sql/vm?view=azure-cli-latest#az_sql_vm_create)

##### Install SQL Management Extension Provider

Register the Provider in Subscription:

```
az provider register --namespace Microsoft.SqlVirtualMachine
```

### PowerShell

[Azure Powershell](https://docs.microsoft.com/en-us/powershell/azure/?view=azps-3.3.0)

[Azure Porwershell Reference](https://docs.microsoft.com/en-us/powershell/module/?view=azps-2.8.0)

Install Azure PowerShell:

```
Install-Module -Name PowerShellGet -Force
Install-Module -Name Az -AllowClobber -Scope CurrentUser
```

## Linux

Create Linux VM using Azure CLI:

To create a Ubuntu VM execute `create-linux-vm.azcli`

Connect to VM:

```
ssh azureuser@104.40.251.162

```