param location string
param name string

resource logAnalytics 'Microsoft.OperationalInsights/workspaces@2023-09-01' = {
  name: name
  location: location
  properties: any({
    retentionInDays: 30
    features: {
      searchVersion: 1
    }
    sku: {
      name: 'PerGB2018'
    }
  })
}

output customerId string = logAnalytics.properties.customerId
// avoid shareing secrets in outputs
// output primaryKey string = logAnalytics.listKeys().primarySharedKey
output id string = logAnalytics.id
