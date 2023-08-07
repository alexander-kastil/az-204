@description('Name of the RG')
param rgLocation string = resourceGroup().location

@description('Name of the signalR')
param signalRName string

@description('Name of the EventGrid Topic')
param egTopic string

resource signalR 'Microsoft.SignalRService/signalR@2023-02-01' ={
  name: signalRName
  location: rgLocation
  sku: {
    capacity: 1
    name: 'Free_F1'
  }
  properties: {
    features: [
      {
        flag: 'ServiceMode'
        value: 'Serverless'
      }
    ]
  }
}

resource topic 'Microsoft.EventGrid/topics@2023-06-01-preview' = {
  name: egTopic
  location: rgLocation
  sku: {
    name: 'Basic'
  }
}
