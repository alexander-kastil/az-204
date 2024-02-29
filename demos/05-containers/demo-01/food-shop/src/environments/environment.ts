declare global {
  interface Window {
    env: any;
  }
}

export const environment = {
  production: true,
  title: 'Food Shop',
  authEnabled: false,
  mockCheckout: true,
  catalogApi: window['env'].CATALOG_API_URL || 'https://localhost:5001',
  ordersApi: window['env'].ORDERS_API_URL || 'https://localhost:5002/',
  azure: {
    apimSubscriptionKey: window['env'].APIM_KEY || "39fc8b24086a4346a6317d047869f983",
    applicationInsights: window['env'].APPLICATION_INSIGHTS || '89094b1f-dde1-4c07-8d40-f7d01ef18d55',
    appReg: {
      clientId: window['env'].CLIENT_ID,
      authority:
        'https://login.microsoftonline.com/' + window['env'].AUTHORITY,
      redirectUri: window['env'].REDIRECT_URI,
      scopes: [
        ['https://graph.microsoft.com/v1.0/me', ['user.read']],
        [
          'https://localhost:5001/food',
          ['api://b509d389-361a-447b-afb2-97cc8131dad6/access_as_user'],
        ],
      ],
    },
  },
  features: {
    logging: false,
    remoteCart: false,
    persistCart: false,
  },
  testuser: 'alexander.pajer@integrations.at',
};
