# Script uses Chocolatey Package Manager for Windows from https://chocolatey.org/
# Execute in elevated Powershell Prompt

# Install Chocolatey
Write-Host "Installing Chocolatey - 1/6" -ForegroundColor yellow

Set-ExecutionPolicy Bypass -Scope Process -Force; 
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; 
Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

# Install Git Related Software
Write-Host "Installing VSCode & Git Related Software" -ForegroundColor yellow
Write-Host "Refresh Path Env - 2/6" -ForegroundColor yellow

choco install googlechrome -y
choco install vscode -y
choco install git -y
choco install gitextensions -y
choco install gh -y

Write-Host "*****" -ForegroundColor red
Write-Host "You can now clone your fork to c:\az-204 using git clone REPO-URL" -ForegroundColor red
Write-Host "git clone https://github.com/Student01/AZ-204/" -ForegroundColor yellow
Write-Host "*****" -ForegroundColor red

# Install Software
Write-Host "Refresh Path Env - 3/6" -ForegroundColor yellow

choco install dotnetcore-sdk -y
choco install dotnet-5.0-sdk -y
choco install dotnet-6.0-sdk -y
choco install nodejs-lts --version=14.18.0 -y
choco install azure-cli -y
choco install azurestorageemulator -y
choco install azurepowershell -y
choco install microsoftazurestorageexplorer -y
choco install azure-data-studio -y
choco install postman -y
choco install ngrok -y
choco install curl -y

# Refresh Path Env
Write-Host "Refresh Path Env - 4/6" -ForegroundColor yellow

$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Install httprepl
dotnet tool install -g Microsoft.dotnet-httprepl
dotnet nuget add source https://api.nuget.org/v3/index.json -n nuget.org

# Intall VS Code Extensions
Write-Host "VS Code Extensions - 5/6" -ForegroundColor yellow

code --install-extension ms-dotnettools.csharp
code --install-extension ms-vscode.powershell
code --install-extension ms-vscode.azurecli
code --install-extension ms-vscode.azure-account
code --install-extension ms-azuretools.vscode-azureappservice
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-azuretools.vscode-cosmosdb
code --install-extension ms-azuretools.vscode-azurefunctions
code --install-extension ms-azuretools.vscode-azurestaticwebapps
code --install-extension GitHub.vscode-pull-request-github
code --install-extension redhat.vscode-yaml
code --install-extension bencoleman.armview
code --install-extension msazurermtools.azurerm-vscode-tools
code --install-extension CoenraadS.bracket-pair-colorizer-2
code --install-extension mdickin.markdown-shortcuts
code --install-extension mhutchie.git-graph 
code --install-extension humao.rest-client

# Azurite Storage Emulator & Function Core Tools v4
npm install -g azure-functions-core-tools@4 --unsafe-perm true
npm install -g azurite

# Install Angular
Write-Host "Installing Angular - 6/6" -ForegroundColor yellow
npx @angular/cli@latest analytics off
npm i -g @angular/cli

# Finished Msg
Write-Host "Finished Software installation" -ForegroundColor yellow
