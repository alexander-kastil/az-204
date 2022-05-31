# Execute: Set-ExecutionPolicy in an elevated PowerShell Prompt

# GitHub Settings vars
$User="Alexander Pajer"
$EMAIL="alexander.pajer@integrations.at"

# Install chocolatey
Write-Host "Installing Chocolatey - 1/6" -ForegroundColor yellow

Set-ExecutionPolicy Bypass -Scope Process -Force; 
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; 
Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

choco install microsoftazurestorageexplorer -y
choco install azure-cosmosdb-emulator -y
choco install azure-data-studio -y
choco install ngrok -y
choco install microsoft-windows-terminal -y
choco install sql-server-express -y
choco install sql-server-management-studio -y

# Tooling
choco install 7zip -y
choco install adobereader -y
choco install displayfusion -y
choco install onedrive -y 
choco install snagit -y 
choco install filezilla -y

# Social
# choco install telegram -y
# choco install signal -y
# choco install googlephotos -y

# Refresh Path Env
Write-Host "Refresh Path Env - 4/6" -ForegroundColor yellow

$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Setup Git
git config --global user.name $User
git config --global user.email $EMAIL

# Turn off Taskbar grouping
Set-ItemProperty -Path HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced -Name TaskbarGlomLevel -Value 2