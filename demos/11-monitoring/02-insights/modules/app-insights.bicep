param aiName string
param logAnalyticsId string
param rgLocation string = resourceGroup().location

resource appInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: aiName
  location: rgLocation
  kind: 'web'
  properties: {
    Application_Type: 'web'
    WorkspaceResourceId: logAnalyticsId
  }
}

output aiKey string = appInsights.properties.InstrumentationKey
output aiConnectionString string = appInsights.properties.ConnectionString
