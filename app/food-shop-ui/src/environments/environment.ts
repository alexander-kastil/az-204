declare global {
  interface Window {
    env: any;
  }
}

export const environment = {
  production: true,
  title: 'Passion for Food!',
  authEnabled: true,
  api: window['env'].API_URL,
  azure: {
    applicationInsights: '',
    signalREndpoint: '',
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
    reactive: false,
    logging: false,
    persistCart: false,
  },
  testuser: 'alexander.pajer@integrations.at',
};
