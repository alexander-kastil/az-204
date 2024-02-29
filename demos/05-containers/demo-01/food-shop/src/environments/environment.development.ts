export const environment = {
  production: false,
  title: 'Food Shop',
  authEnabled: false,
  mockCheckout: true,
  catalogApi: 'http://localhost:5001',
  ordersApi: 'http://localhost:5002',
  azure: {
    apimSubscriptionKey: "39fc8b24086a4346a6317d047869f983",
    applicationInsights: 'd1588cb9-4e43-4fdc-9aef-99436565d628',
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
  testuser: 'alexander.pajer@integrations.at',
};
