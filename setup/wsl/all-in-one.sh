#!/bin/bash
set -euo pipefail

# ensure bash (not sh) even if invoked incorrectly
if [ -z "${BASH_VERSION:-}" ]; then
	exec /bin/bash "$0" "$@"
fi

if [[ $(id -u) -ne 0 ]]; then
	echo "Run this script with sudo: sudo bash setup/wsl/all-in-one.sh" >&2
	exit 1
fi

apt update
apt install -y curl wget ca-certificates gnupg lsb-release apt-transport-https software-properties-common build-essential

# node & azure cli prereqs (node 22 only)
export NVM_DIR="/usr/local/nvm"
mkdir -p "$NVM_DIR"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm install 22.12.0
nvm use 22.12.0
npm install -g @angular/cli

# .net (install SDKs 9 & 10 via dotnet-install script; 10 may be preview)
wget https://packages.microsoft.com/config/ubuntu/24.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
dpkg -i packages-microsoft-prod.deb
rm -f packages-microsoft-prod.deb

curl -sSL https://dot.net/v1/dotnet-install.sh -o /tmp/dotnet-install.sh
chmod +x /tmp/dotnet-install.sh
/tmp/dotnet-install.sh --version 9.0.100 --install-dir /usr/share/dotnet
/tmp/dotnet-install.sh --version 10.0.100 --install-dir /usr/share/dotnet || true # tolerate if not yet published
ln -sf /usr/share/dotnet/dotnet /usr/bin/dotnet

# python 3.12 (default in Ubuntu 24.04)
apt install -y python3 python3-venv python3-dev python3-pip
python3 -m pip install --upgrade pip

# azure cli
curl -sL https://aka.ms/InstallAzureCLIDeb | bash
az config set extension.use_dynamic_install=yes

# azure functions core tools
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm use 22.12.0
npm install -g azure-functions-core-tools@4 --unsafe-perm true

