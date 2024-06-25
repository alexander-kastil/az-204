export const environment = {
  production: false,
  title: 'Food App',
  authEnabled: false,
  mockCheckout: true,
  catalogApi: 'https://localhost:5001/',
  ordersApi: 'http://localhost:3000/',
  azure: {
    applicationInsights: '18d6c30e-592e-413a-a371-d0c610a4204b',
    appReg: {
      clientId: 'd23642f7-9ccf-4165-92e7-919f625a5acc',
      authority:
        'https://login.microsoftonline.com/d92b247e-90e0-4469-a129-6a32866c0d0a/',
      redirectUri: 'http://localhost:4200/',
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
  testuser: 'alexander.kastil@integrations.at',
};
