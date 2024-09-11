# Class Environment Setup

- Install Software
- [Install Windows Subsystem Linux - Optional](./wsl/)
- [Setup local container support - Optional](./docker/)
- [Create Lab VM - Optional](./lab-vm/)

## Install Software

>Note: Create Lab VM is an optional step that you could execute in advance if you want to develop on Azure hosted VM. If you want to develop on your local machine you can skip this step.

To install Software run the script `setup-az-204.ps1` from an elevated PowerShell prompt:

![run-as](_images/run-as.jpg)

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force;
Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://raw.githubusercontent.com/alexander-kastil/az-204/main/setup/setup-az-204.ps1'))
```

> Note: This script will run for approx 15 min. 

## Setup Git & Clone Class Repository

Login to GitHub using [GitHub CLI](https://cli.github.com/manual/):

```bash
gh auth login
```

Fork the class repository:

```bash
gh repo fork https://github.com/alexander-kastil/az-204/
```

Download the forked repository:

```bash 
gh repo clone https://github.com/<USERNAME>/az-204/
```

Set User and E-Mail:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@yourdomain.com
```

Congratulations you have completed the base setup of your class software requirements.