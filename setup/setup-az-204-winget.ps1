# Script uses Chocolatey Package Manager for Windows from https://chocolatey.org/
# Execute in elevated Powershell Prompt

# Install Git Related Software
Write-Host "Installing VSCode & Git Related Software" -ForegroundColor yellow
Write-Host "Refresh Path Env - 2/6" -ForegroundColor yellow

winget install -e --id Microsoft.VisualStudioCode
winget install -e --id Git.Git
winget install -e --id GitHub.GitLFS
winget install -e --id GitHub.cli

Write-Host "*****" -ForegroundColor red
Write-Host "You can now clone your fork to c:\az-204 using git clone REPO-URL" -ForegroundColor red
Write-Host "git clone https://github.com/Student01/AZ-204/" -ForegroundColor yellow
Write-Host "*****" -ForegroundColor red

# Install Software
Write-Host "Refresh Path Env - 3/6" -ForegroundColor yellow

winget install -e --id Google.Chrome
winget install -e --id Microsoft.DotNet.SDK.8
winget install -e --id CoreyButler.NVMforWindows
winget install -e --id Microsoft.AzureCLI
winget install -e --id Microsoft.AzureDataStudio

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
code --install-extension ms-azuretools.vscode-azureterraform
code --install-extension vs-publisher-1448185.keyoti-changeallendoflinesequence
code --install-extension ms-kubernetes-tools.vscode-kubernetes-tools
code --install-extension ms-python.python
code --install-extension alex-pattison.theme-cobalt3
code --install-extension savranweb.cosmosdbsqlapi
code --install-extension ms-kubernetes-tools.vscode-aks-tools

# Azurite Storage Emulator & Function Core Tools v4
nvm install 20.12.2
nvm use 20.12.2
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
