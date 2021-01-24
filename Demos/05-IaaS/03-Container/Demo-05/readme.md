# Azure Kubernetes Service

[Azure Kubernetes Service (AKS)](https://docs.microsoft.com/en-us/azure/aks/)

[az aks Commands Overview](https://docs.microsoft.com/en-us/cli/azure/aks?view=azure-cli-latest)

[DevSpaces Intro](https://docs.microsoft.com/en-us/azure/dev-spaces/quickstart-team-development)

#### Create AKS Cluster

> Note: Use FoodApp from Demo-01

Install kubectl command line client locally:

`az aks install-cli`

> Note: You might need to set a path to your system env variables

Create resource group:

`az group create -name az-204 --location westeurope`

Create AKS cluster:

`az aks create --resource-group az-204 --name foodcluster --node-count 1 --enable-addons monitoring --generate-ssh-keys`

Get credentials for the Kubernets cluster:

`az aks get-credentials --resource-group az-204 --name foodcluster`

Get a list of cluster nodes:

`kubectl get nodes`

Apply the yaml

`kubectl apply -f foodui.yaml`

Get the serive IP and use it on the assigned port

kubectl get service foodui --watch
