export const environment = {
  production: true,
  title: 'Passion for Food!',
  authEnabled: false,
  api: (<any>window)['env'].api,
  azure: {
    applicationInsights: (<any>window)['env'].applicationInsights,
    signalREndpoint: (<any>window)['env'].signalREndpoint,
    appReg: {
      clientId: (<any>window)['env'].clientId,
      authority: (<any>window)['env'].authority,
      redirectUri: (<any>window)['env'].redirectUri,
      scopes: (<any>window)['env'].scopes,
    },
  },
  features: {
    reactive: (<any>window)['env'].reactive,
    logging: (<any>window)['env'].logging,
    persistCart: (<any>window)['env'].persistCart,
  },
};
