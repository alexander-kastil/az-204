@description('Name of the RG')
param rgLocation string = resourceGroup().location

@description('Name of the managed identity')
param miName string

@description('Name of the Key Vault')
param kvName string

@description('Name of the App Config')
param cfgName string

@description('ObjectId of the user with kv access')
param kvUser string

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

@description('Name of the Storage Account')
param storageName string

@description('Name of the Cosmos DB Account')
param dbAccount string

@description('Name of the Cosmos DB')
param dbName string

// ressources
resource mi 'Microsoft.ManagedIdentity/userAssignedIdentities@2018-11-30' = {
  name: miName
  location: rgLocation
}

resource appCfg 'Microsoft.AppConfiguration/configurationStores@2023-03-01' = {
  name: cfgName
  location: rgLocation
  sku: {
    name: 'Free'
  }
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: {
      '${mi.id}':{}
    }
  }
  properties: {
    publicNetworkAccess: 'Enabled'
  }
}

resource keyVault 'Microsoft.KeyVault/vaults@2021-10-01' = {
  name: kvName
  location: rgLocation
  properties: {
    enabledForDeployment: true
    enabledForTemplateDeployment: true
    sku: {
      family: 'A'
      name: 'standard'
    }
    tenantId: subscription().tenantId
    accessPolicies: [
      {
        tenantId: subscription().tenantId
        objectId: kvUser
        permissions: {
          keys: [ 'all' ]
          secrets: [ 'all' ]
          certificates: [ 'all' ]
        }
      }
      {
        tenantId: subscription().tenantId
        objectId: mi.properties.principalId
        permissions: {
          secrets: [ 'LIST', 'GET' ]
        }
      }
    ]
  }
}

resource storageAcct 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: storageName
  location: rgLocation
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  properties: {
    accessTier: 'Hot'
    allowBlobPublicAccess: false
    minimumTlsVersion: 'TLS1_2'
    networkAcls: {
      bypass: 'AzureServices'
      defaultAction: 'Deny'
      ipRules: []
      virtualNetworkRules: []
    }
    supportsHttpsTrafficOnly: true
  }
}

resource storageKey 'Microsoft.KeyVault/vaults/secrets@2023-02-01' = {
  parent: keyVault
  name: 'storageKey'
  properties: {
    value: storageAcct.listKeys().keys[0].value
  }
}

resource storageCS 'Microsoft.KeyVault/vaults/secrets@2023-02-01' = {
  parent: keyVault
  name: 'storageConStr'
  properties: {
    value: 'DefaultEndpointsProtocol=https;AccountName=${storageAcct.name};AccountKey=${storageAcct.listKeys().keys[0].value};EndpointSuffix=${environment().suffixes.storage}'
  }
}

resource storage_blobs 'Microsoft.Storage/storageAccounts/blobServices@2023-01-01' = {
  name: 'default'
  parent: storageAcct
}

resource invoicesContainer 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-01-01' = {
  name: 'invoices'
  parent: storage_blobs
}

resource picturesContainer 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-01-01' = {
  name: 'pictures'
  parent: storage_blobs
}

resource dropContainer 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-01-01' = {
  name: 'pictures-drop'
  parent: storage_blobs
}

resource storage_queues 'Microsoft.Storage/storageAccounts/queueServices@2021-09-01' = {
  name: 'default'
  parent: storageAcct
}

resource orderQueue 'Microsoft.Storage/storageAccounts/queueServices/queues@2022-09-01' = {
  name: 'food-orders'
  parent: storage_queues
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

resource acrPassword 'Microsoft.KeyVault/vaults/secrets@2023-02-01' = {
  parent: keyVault
  name: 'acrPassword'
  properties: {
    value: containerRegistry.listCredentials().passwords[0].value
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

resource wsId 'Microsoft.KeyVault/vaults/secrets@2023-02-01' = {
  parent: keyVault
  name: 'wsId'
  properties: {
    value: logAnalytics.id
  }
}

resource wsKey 'Microsoft.KeyVault/vaults/secrets@2023-02-01' = {
  parent: keyVault
  name: 'wsKey'
  properties: {
    value: logAnalytics.listKeys().primarySharedKey
  }
}

resource appInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: aiName
  location: rgLocation
  kind: 'web'
  properties: {
    Application_Type: 'web'
    WorkspaceResourceId: logAnalytics.id
  }
}

resource aiKey 'Microsoft.KeyVault/vaults/secrets@2023-02-01' = {
  parent: keyVault
  name: 'aiKey'
  properties: {
    value: appInsights.properties.InstrumentationKey
  }
}

resource aiConStr 'Microsoft.KeyVault/vaults/secrets@2023-02-01' = {
  parent: keyVault
  name: 'aiConStr'
  properties: {
    value: appInsights.properties.ConnectionString
  }
}

resource acaEnvironment 'Microsoft.App/managedEnvironments@2023-05-01' = {
  name: acaEnv
  location: rgLocation
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
  properties: {
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

resource cosmosCS 'Microsoft.KeyVault/vaults/secrets@2023-02-01' = {
  parent: keyVault
  name: 'cosmosConStr'
  properties: {
    value: cosmosDBAcct.listConnectionStrings().connectionStrings[0].connectionString
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
