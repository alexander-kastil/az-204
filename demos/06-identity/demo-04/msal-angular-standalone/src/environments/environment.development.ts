export const environment = {
    production: false,
    msalConfig: {
        auth: {
            clientId: '7845c97d-02c3-4f13-b570-3c72267d103c',
            authority: 'https://login.microsoftonline.com/d92b247e-90e0-4469-a129-6a32866c0d0a'
        }
    },
    apiConfig: {
        scopes: ['user.read'],
        uri: 'https://graph.microsoft.com/v1.0/me'
    }
};
