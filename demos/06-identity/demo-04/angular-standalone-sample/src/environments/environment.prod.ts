export const environment = {
  production: true,
  msalConfig: {
    auth: {
      clientId: 'c1a4b727-d7e4-4daf-bd2b-5fc7119aab2b',
      authority: 'https://login.microsoftonline.com/d92b247e-90e0-4469-a129-6a32866c0d0a/',
    },
  },
  apiConfig: {
    scopes: ['user.read', 'offline_access', 'openid', 'profile', 'mail.send'],
    uri: 'https://localhost:5001/api/',
  },
};
