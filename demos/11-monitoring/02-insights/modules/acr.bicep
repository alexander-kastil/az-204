param name string
param location string = resourceGroup().location
param sku string = 'Basic'
param enableAdminUser bool = true

resource containerRegistry 'Microsoft.ContainerRegistry/registries@2023-07-01' = {
  name: name
  location: location
  sku: {
    name: sku
  }
  properties: {
    adminUserEnabled: enableAdminUser
  }
}

output adminUsername string = containerRegistry.name
