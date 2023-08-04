declare global {
  interface Window {
    env: any;
  }
}

export const environment = {
  production: true,
  title: 'Food App',
  authEnabled: false,
  mockCheckout: true,
  catalogApi: window['env'].API_URL || 'https://localhost:5001',
  ordersApi: 'http://localhost:3000/',
  azure: {
    applicationInsights: window['env'].APPLICATION_INSIGHTS || '18d6c30e-592e-413a-a371-d0c610a4204b',
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
