resource catalog_service_dev 'Microsoft.App/containerApps@2024-10-02-preview' = {
  name: 'catalog-service-dev'
  location: 'West Europe'
  properties: {
    provisioningState: 'Failed'
    managedEnvironmentId: '/subscriptions/78033352-805c-4acd-af80-f8f95083268d/resourceGroups/az204-m05-containers/providers/Microsoft.App/managedEnvironments/az204-demo-dev'
    environmentId: '/subscriptions/78033352-805c-4acd-af80-f8f95083268d/resourceGroups/az204-m05-containers/providers/Microsoft.App/managedEnvironments/az204-demo-dev'
    workloadProfileName: 'Consumption'
    patchingMode: 'Automatic'
    outboundIpAddresses: [
      '51.137.8.84'
      '51.137.8.250'
      '98.64.213.69'
      '4.175.48.136'
      '98.64.208.171'
      '98.64.213.254'
      '98.64.209.113'
      '98.64.211.186'
      '4.175.51.174'
      '98.64.215.90'
      '4.175.51.59'
      '98.64.210.120'
      '40.114.177.194'
      '40.114.177.222'
      '20.8.61.140'
      '20.23.204.52'
      '4.180.170.19'
      '4.180.170.176'
      '4.180.170.198'
      '4.180.170.209'
      '20.103.135.29'
      '20.103.134.29'
      '20.4.8.235'
      '20.4.9.8'
      '20.4.9.12'
      '20.4.9.6'
      '20.4.9.0'
      '20.4.9.2'
      '108.142.173.180'
      '20.4.9.17'
      '20.4.8.250'
      '20.4.8.112'
      '20.103.132.54'
      '20.16.47.111'
      '20.234.178.191'
      '20.234.178.202'
      '20.16.42.139'
      '20.234.178.176'
      '20.234.178.189'
      '20.234.178.116'
      '20.234.178.197'
      '20.234.178.33'
      '20.234.178.156'
      '20.103.134.224'
      '108.141.252.113'
      '108.141.252.123'
      '108.141.60.221'
      '108.141.61.84'
      '108.141.61.64'
      '108.141.60.213'
      '4.175.88.205'
      '4.175.89.31'
      '4.175.131.66'
      '4.175.131.215'
      '4.175.131.90'
      '4.175.131.212'
      '4.175.131.65'
      '4.175.131.140'
      '4.175.131.232'
      '4.175.131.161'
      '4.175.130.3'
      '4.175.131.35'
      '4.175.89.19'
      '4.175.89.7'
      '20.31.237.60'
      '20.54.209.151'
      '57.153.74.153'
      '57.153.72.51'
      '57.153.74.169'
      '57.153.72.156'
      '4.175.135.12'
      '108.141.36.217'
      '4.175.134.236'
      '4.175.135.1'
      '4.175.134.222'
      '4.175.134.119'
      '4.175.134.181'
      '4.175.134.76'
      '4.175.134.240'
      '4.175.134.184'
      '20.61.156.164'
      '20.61.156.185'
      '20.61.156.214'
      '20.61.156.178'
      '20.61.156.182'
      '20.61.156.102'
      '20.61.156.93'
      '20.61.156.117'
      '20.61.156.159'
      '20.61.156.194'
      '20.61.156.196'
      '20.61.156.154'
      '20.61.156.206'
      '20.61.156.198'
      '20.61.156.161'
      '20.61.156.213'
      '20.61.156.105'
      '20.61.155.144'
      '20.61.156.166'
      '20.61.156.100'
      '132.164.34.249'
    ]
    customDomainVerificationId: '1387F783D35B4E628CFECBEF659048D3844B3364AFAB806A32607A7B0D3AA59F'
    configuration: {
      secrets: null
      activeRevisionsMode: 'Single'
      targetLabel: null
      ingress: {
        fqdn: null
        external: true
        targetPort: 8080
        exposedPort: null
        transport: 'Auto'
        traffic: null
        customDomains: null
        allowInsecure: false
        ipSecurityRestrictions: null
        corsPolicy: null
        clientCertificateMode: null
        stickySessions: null
        additionalPortMappings: null
        targetPortHttpScheme: null
      }
      registries: null
      identitySettings: []
      dapr: null
      runtime: null
      maxInactiveRevisions: 100
      service: null
    }
    template: {
      revisionSuffix: null
      terminationGracePeriodSeconds: null
      containers: [
        {
          image: 'az204demosdev.azurecr.io/catalog-service'
          imageType: 'CloudBuild'
          name: 'catalog-service-dev'
        }
      ]
      initContainers: null
      scale: {
        minReplicas: 1
        maxReplicas: 1
        cooldownPeriod: null
        pollingInterval: null
        rules: []
      }
      volumes: null
      serviceBinds: null
    }
    delegatedIdentities: []
    deploymentErrors: 'The following field(s) are either invalid or missing. Field \'template.containers.catalog-service-dev.image\' is invalid with details: \'Invalid value: "az204demosdev.azurecr.io/catalog-service": GET https:?scope=repository%3Acatalog-service%3Apull&service=az204demosdev.azurecr.io: UNAUTHORIZED: authentication required, visit https://aka.ms/acr/authorization for more information. CorrelationId: d2d5facb-40c7-4924-afd1-b8ee5541be91\';.'
  }
  identity: {
    type: 'None'
  }
}
