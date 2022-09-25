sudo apt update

# node
sudo curl -sL https://deb.nodesource.com/setup_14.x | sudo bash
sudo apt-get install -y nodejs

# .net
wget https://packages.microsoft.com/config/ubuntu/20.10/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb

sudo apt-get install -y apt-transport-https && \
sudo apt-get update && \
sudo apt-get install -y dotnet-sdk-3.1

sudo apt-get install -y apt-transport-https && \
sudo apt-get update && \
sudo apt-get install -y dotnet-sdk-6.0

# azure cli
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
az config set extension.use_dynamic_install=yes

# function core tools
sudo npm install -g azure-functions-core-tools@4 --unsafe-perm true