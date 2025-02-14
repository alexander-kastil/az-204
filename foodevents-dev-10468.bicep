resource foodevents_dev_10468 'Microsoft.EventGrid/topics@2025-02-15' = {
  properties: {
    provisioningState: 'Succeeded'
    endpoint: 'https://foodevents-dev-10468.westeurope-1.eventgrid.azure.net/api/events'
    inputSchema: 'CloudEventSchemaV1_0'
    metricResourceId: 'b54139af-c98a-469e-a58f-b30192b156ef'
    publicNetworkAccess: 'Enabled'
    disableLocalAuth: false
    dataResidencyBoundary: 'WithinGeopair'
  }
  identity: {
    type: 'None'
    principalId: null
    tenantId: null
    userAssignedIdentities: null
  }
  location: 'westeurope'
  tags: null
  name: 'foodevents-dev-10468'
}
