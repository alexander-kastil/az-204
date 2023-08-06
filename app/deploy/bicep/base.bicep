@description('Name of the RG')
param rgLocation string = resourceGroup().location

@description('Name of the Key Vault')
param kvName string

@description('Name of the connected Container Registry')
param acrName string

@description('Name of the Container App Environment')
param acaEnv string

@description('Name of the Log Analytics Workspace')
param logAnalyticsName string

@description('Name of App Insights')
param aiName string

@description('Name of the Service Bus')
param sbNamespace string

@description('Name of the Cosmos DB Account')
param dbAccount string

@description('Name of the Cosmos DB')
param dbName string

// ressources

resource keyVault 'Microsoft.KeyVault/vaults@2021-10-01' ={
  name: kvName
  location: rgLocation
  properties: {
    sku: {
      family: 'A'
      name: 'standard'
    }
    tenantId: subscription().tenantId
    accessPolicies: [
      {
        tenantId: subscription().tenantId
        objectId: subscription().subscriptionId
        permissions: {
          keys: ['all']
          secrets: ['all']
          certificates: ['all']
        }
      }
    ]
  }
}

resource containerRegistry 'Microsoft.ContainerRegistry/registries@2021-12-01-preview' = {
  name: acrName
  location: rgLocation
  sku: {
    name: 'Basic'
  }
  properties: {
    adminUserEnabled: true
  }
}

resource logAnalytics 'Microsoft.OperationalInsights/workspaces@2021-06-01' = {
  name: logAnalyticsName
  location: rgLocation
  properties: {
    sku: {
      name: 'PerGB2018'
    }
  }  
}

resource appInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: aiName
  location: rgLocation
  kind: 'web'
  properties:{
    Application_Type: 'web'
    WorkspaceResourceId: logAnalytics.id
  }    
}

resource acaEnvironment 'Microsoft.App/managedEnvironments@2022-06-01-preview' = {
  name: acaEnv
  location: rgLocation
  sku: {
    name: 'Consumption'
  }
  properties: {
    appLogsConfiguration: {
      destination: 'log-analytics'
      logAnalyticsConfiguration: {
        customerId: logAnalytics.properties.customerId
        sharedKey: logAnalytics.listKeys().primarySharedKey
      }
    }
  }
}

resource serviceBus 'Microsoft.ServiceBus/namespaces@2022-10-01-preview' = {
  name: sbNamespace
  location: rgLocation
  sku: {
    capacity: 1
    name: 'Standard'
    tier: 'Standard'
  }  
}

resource cosmosDBAcct 'Microsoft.DocumentDB/databaseAccounts@2023-04-15' = {
  name: dbAccount
  location: rgLocation
  kind: 'GlobalDocumentDB'
  properties:{
    enableFreeTier: true
    databaseAccountOfferType: 'Standard'
    locations: [
      {
        locationName: rgLocation
        failoverPriority: 0
        isZoneRedundant: false
      }
    ]
  }
}

resource cosmosDB 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases@2023-04-15' = {
  name: dbName  
  location: rgLocation
  parent: cosmosDBAcct
  properties: {
    resource: {
      id: dbName  
    }   
  }
}

resource ordersContainer 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers@2023-04-15' = {
  name: 'orders'
  location: rgLocation
  parent: cosmosDB
  properties: {
    resource: {
      id: 'orders'
      partitionKey: {
        paths: [
          '/customerId'
        ]
        kind: 'Hash'
      }
    }
  }
}

resource paymentsContainer 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers@2023-04-15' = {
  name: 'payments'
  location: rgLocation
  parent: cosmosDB
  properties: {
    resource: {
      id: 'payments'
      partitionKey: {
        paths: [
          '/customerId'
        ]
        kind: 'Hash'
      }
    }
  }
}
