# Setup Docker & Windows Subsystem for Linux WSL

## Setup Docker Support - optional

There are two options to configure Docker support. WSL2 recommended

In order for Docker to work on a Windows 10 VM you need to install Hyper-V or use Windows Subsystem for Linux 2 (WSL2). Therefore you must use hardware that supports [Nested Virtualization](https://docs.microsoft.com/en-us/azure/lab-services/how-to-enable-nested-virtualization-template-vm). A detailed Setup Guide can be found [here](https://github.com/ARambazamba/ClassSetup).

### Option 1 - Install Docker with Hyper-V

Install Hyper-V using `setup-docker.ps1` and restart after execution.

Check Docker Settings:

![docker-test](_images/docker-settings.jpg)

### Option 2 - Install Docker with WSL2

#### <a id="wsl">Install WSL2</a>

Execute script `setup-wsl2.ps1` multible times to setup WSL2. 

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force;
Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://raw.githubusercontent.com/arambazamba/az-204/main/Tooling/08-Docker-WSL/setup-wsl2.ps1'))
```

First Run:

![finish-sw](_images/finish-sw.jpg)

>Note: Reboot between first and second run.

Second Run:

![select-distro](_images/select-distro.jpg)

After the second run your selected linux distro will be opened an you can set your username:

> Note: You can take the same credntials just like on the Windows VM

```
user=azlabadmin
pwd=Lab@dmin1234
```

![ubuntu-setup](_images/ubuntu-setup.jpg)

#### <a id="docker-wsl">Install Docker using WSL2</a>

Install Docker Desktop using an elevated Powershell:

```
choco install docker-desktop -y
```

![install-docker-desktop](_images/install-docker-desktop.jpg)

Log off and on after installation:

![log-off](_images/log-off.jpg)

> Note: Enter `logoff` in the current console

Start Docker Desktop and switch to settings:

![switch-settings](_images/switch-settings.jpg)

Check the WSL2 settings:

![switch-settings](_images/docker-settings-wsl.jpg)

---

### Test Docker Installation

In the console window execute:

```
docker run hello-world
```

![docker-test](_images/docker-test.png)

## <a id="teams">Optional - Using Teams in VM</a>

To avoid switching between Host an VM you can use Microsoft [Teams Web Client](http://teams.microsoft.com) to see all Chat messages