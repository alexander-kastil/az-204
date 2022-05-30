# Lab VM Setup Guide

- Create VM - Optional
- Install Software
- Install Windows Subsystem Linux - Optional

## <a id="basics">Create VM - Optional</a>

Execute `create-lab-vm.azcli` or run the following remote script in Cloud Shell

```bash
curl https://raw.githubusercontent.com/arambazamba/az-204/main/Setup/create-lab-vm.azcli | bash
```

![create-labvm](_images/create-lab-vm.jpg)

`create-lab-vm.azcli`:

```bash
rnd=$RANDOM
loc=westeurope
grp=az-lab
vmname=labvm-$rnd
user=azlabadmin
pwd=Lab@dmin1234

az group create -n $grp -l $loc

az vm create -g $grp -n $vmname --admin-username $user --admin-password $pwd --image MicrosoftWindowsDesktop:Windows-10:win10-21h2-pro-g2:latest --size Standard_E2s_v3 --public-ip-sku Standard
```

Connect to VM:

Go to Ressource Group `az-lab` and connect to VM using RDP and the credentials that you have used in the script:

Download RDP File:

![download-rdp](_images/download-rdp.jpg)

Optional - Disable Login:

![disable-login](_images/disable-login.jpg)

Sign In & Remember:

![connect-rdp](_images/trust-vm.jpg)

Credentials:

```
user=azlabadmin
pwd=Lab@dmin1234
```

![sign-in.jpg](_images/sign-in.jpg)

Accept Settings:

![accept-settings](_images/accept-settings.jpg)

## Install Software

To install Software run the script `setup-az-204.ps1` from an elevated PowerShell prompt:

![run-as](_images/run-as.jpg)

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force;
Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://raw.githubusercontent.com/ARambazamba/AZ-204/master/Setup/setup-az-204.ps1'))
```

> Note: This script will run for approx 20 min. No need to wait! In the meantime you can continue to fork and clone my repo as described in the next section.

Congratulations you have completed the base setup of your class vm.

## Install Windows Subsystem Linux - Optional

Requires Windows 10 - May 2020 Update or higher. To Update use this [link](https://www.microsoft.com/de-de/software-download/windows10).

[Install WSL 2](https://docs.microsoft.com/en-us/windows/wsl/install)

```
wsl --install
```

### Frameworks & Runtimes

[Introduction to Bash Scripting](https://www.taniarascia.com/how-to-create-and-use-bash-scripts/)

#### Node

Install Node 14.x on WSL

```
sudo apt update
sudo curl -sL https://deb.nodesource.com/setup_14.x | sudo bash
sudo apt-get install -y nodejs
```

#### .NET 6 

Register Packages:

```
wget https://packages.microsoft.com/config/ubuntu/20.10/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
```
Install .NET:

```
sudo apt-get update; \
sudo apt-get install -y apt-transport-https && \
sudo apt-get update && \
sudo apt-get install -y dotnet-sdk-6.0
```