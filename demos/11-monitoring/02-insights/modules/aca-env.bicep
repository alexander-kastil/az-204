param name string
param location string
param logsCustomerId string
@secure()
param logsPrimaryKey string

resource env 'Microsoft.App/managedEnvironments@2023-05-01' = {
  name: name
  location: location
  properties: {
    appLogsConfiguration: {
      destination: 'log-analytics'
      logAnalyticsConfiguration: {
        customerId: logsCustomerId
        sharedKey: logsPrimaryKey
      }
    }
  }
}
output id string = env.id
