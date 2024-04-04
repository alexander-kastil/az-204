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

choco install vscode -y
choco install git -y
choco install git-lfs.install -y
choco install gh -y

Write-Host "*****" -ForegroundColor red
Write-Host "You can now clone your fork to c:\az-204 using git clone REPO-URL" -ForegroundColor red
Write-Host "git clone https://github.com/Student01/AZ-204/" -ForegroundColor yellow
Write-Host "*****" -ForegroundColor red

# Install Software
Write-Host "Refresh Path Env - 3/6" -ForegroundColor yellow

choco install googlechrome -y
choco install vscode -y
choco install dotnet-8.0-sdk -y
choco install nodejs-lts --version=18.17.1 -y
choco install azure-cli -y
choco install azd -y
choco install curl -y
choco install azure-data-studio -y 
choco install azure-cosmosdb-emulator -y

# Refresh Path Env
Write-Host "Refresh Path Env - 4/6" -ForegroundColor yellow
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Install Azure CLI Extensions without prompt
az config set extension.use_dynamic_install=yes_without_prompt

# Install httprepl
dotnet tool install -g Microsoft.dotnet-httprepl

# Set NuGet Source
dotnet nuget add source https://api.nuget.org/v3/index.json -n nuget.org

# Intall VS Code Extensions
Write-Host "VS Code Extensions - 5/6" -ForegroundColor yellow

code --install-extension ms-dotnettools.csharp
code --install-extension ms-vscode.powershell
code --install-extension ms-vscode.azurecli
code --install-extension ms-vscode.azure-account
code --install-extension ms-azuretools.vscode-azureappservice
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-azuretools.vscode-azurefunctions
code --install-extension GitHub.vscode-pull-request-github
code --install-extension redhat.vscode-yaml
code --install-extension bencoleman.armview
code --install-extension mdickin.markdown-shortcuts
code --install-extension mhutchie.git-graph 
code --install-extension ms-azure-devops.azure-pipelines		
code --install-extension vs-publisher-1448185.keyoti-changeallendoflinesequence
code --install-extension ms-kubernetes-tools.vscode-kubernetes-tools
code --install-extension alex-pattison.theme-cobalt3
code --install-extension savranweb.cosmosdbsqlapi

# Azurite Storage Emulator & Function Core Tools v4
npm install -g azure-functions-core-tools@4 --unsafe-perm true --force
npm install -g azurite

# Azure Developer CLI
powershell -ex AllSigned -c "Invoke-RestMethod 'https://aka.ms/install-azd.ps1' | Invoke-Expression"

# Install Angular
Write-Host "Installing Angular - 6/6" -ForegroundColor yellow
npx @angular/cli@latest analytics off
npm i -g @angular/cli

# Finished Msg
Write-Host "Finished Software installation" -ForegroundColor yellow
