export const environment = {
  production: false,
  title: 'Food Shop',
  authEnabled: true,
  mockCheckout: true,
  catalogApi: 'http://localhost:5001/',
  ordersApi: 'http://localhost:5002/',
  azure: {
    apimSubscriptionKey: "39fc8b24086a4346a6317d047869f983",
    applicationInsights: '52b8acc5-249c-491e-88f9-f89cde4b37d1'
  },
  features: {
    logging: false,
    remoteCart: false,
    persistCart: false,
  }
};
