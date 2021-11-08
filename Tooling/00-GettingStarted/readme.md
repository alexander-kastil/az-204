# Getting Started

- [Register your Azure Pass](../05-AzurePass)
- [Setup your Lab Machine & install required Software using Script](../../Setup)
- Configure Git
- Setup Git and Fork the class repo

## Configure Git

Set User and E-Mail in order to be able to commit to git:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@yourdomain.com"
```

## Setup Git and Fork the class repo

Go to `https://github.com/ARambazamba/az-204` and fork the repo or use the GitHub Cli

```
gh repo fork https://github.com/arambazamba/az-204
```

![forking-wf](_images/fork.jpg)

The forking-workflow allows you to commit your changes to your fork of the repo and still get updates on the repo

![forking-wf](_images/forking-workflow.jpg)

Clone Class Repo:

```bash
git clone https://github.com/Student01/az-204
```

> Note: If you have forked the class repo clone your own fork, otherwise use https://github.com/ARambazamba/az-204