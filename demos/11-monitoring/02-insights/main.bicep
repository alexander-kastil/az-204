param appName string
param rgLocation string = resourceGroup().location
param acaEnvName string
param acrName string
@secure()
param acrPwd string
param catalogName string
param catalogImage string
param shopName string
param shopImage string
param orderName string
param orderImage string

module logWS 'modules/log-analytics.bicep' = {
  name: '${appName}logs'
  params: {
    location: rgLocation
    name: '${appName}logs'
  }
}

module appInsights 'modules/app-insights.bicep' = {
  name: '${appName}-app-insights'
  params: {
    rgLocation: rgLocation
    aiName: '${appName}-app-insights'
    logAnalyticsId: logWS.outputs.id
  }
}

// because we need the primary key for the ACA Environment module, we need to get it from the existing Log Analytics workspace
resource logWSInstance 'Microsoft.OperationalInsights/workspaces@2023-09-01' = {
  name: '${appName}logs'
  location: rgLocation
}

module containerAppEnvironment 'modules/aca-env.bicep' = {
  name: 'container-app-environment'
  params: {
    name: acaEnvName
    location: rgLocation
    logsCustomerId: logWS.outputs.customerId
    logsPrimaryKey: logWSInstance.listKeys().primarySharedKey // provided the instance we can use functions like listKeys
  }
}

module catalogApi 'modules/container-app.bicep' = {
  name: catalogName
  params: {
    name: catalogName
    location: rgLocation
    containerAppEnvironmentId: containerAppEnvironment.outputs.id
    containerImage: '${acrName}.azurecr.io/${catalogImage}:latest'
    containerPort: 8080
    envVars: [
      {
        name: 'ApplicationInsights__ConnectionString'
        value: appInsights.outputs.aiConnectionString
      }
    ]
    useExternalIngress: true
    registry: acrName
    registryUsername: acrName
    registryPassword: acrPwd
  }
}

module orderApi 'modules/container-app.bicep' = {
  name: orderName
  params: {
    name: orderName
    location: rgLocation
    containerAppEnvironmentId: containerAppEnvironment.outputs.id
    containerImage: '${acrName}.azurecr.io/${orderImage}:latest'
    containerPort: 8080
    envVars: [
      {
        name: 'ApplicationInsights__ConnectionString'
        value: appInsights.outputs.aiConnectionString
      }
    ]
    useExternalIngress: true
    registry: acrName
    registryUsername: acrName
    registryPassword: acrPwd
  }
}

module shopUI 'modules/container-app.bicep' = {
  name: shopName
  params: {
    name: shopName
    location: rgLocation
    containerAppEnvironmentId: containerAppEnvironment.outputs.id
    containerImage: '${acrName}.azurecr.io/${shopImage}:latest'
    containerPort: 80
    envVars: [
      {
        name: 'ENV_CATALOG_API_URL'
        value: 'https://${catalogApi.outputs.fqdn}'
      }
      {
        name: 'ENV_ORDERS_API_URL'
        value: 'https://${orderApi.outputs.fqdn}'
      }
      {
        name: 'ENV_APPLICATION_INSIGHTS'
        value: appInsights.outputs.aiKey
      }
    ]
    useExternalIngress: true
    registry: acrName
    registryUsername: acrName
    registryPassword: acrPwd
  }
}
