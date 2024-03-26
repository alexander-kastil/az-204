export const environment = {
  production: false,
  title: 'Food Shop',
  authEnabled: true,
  mockCheckout: true,
  catalogApi: 'http://localhost:5001/',
  ordersApi: 'http://localhost:5002/',
  azure: {
    apimSubscriptionKey: "39fc8b24086a4346a6317d047869f983",
    applicationInsights: 'd1588cb9-4e43-4fdc-9aef-99436565d628'
  },
  features: {
    logging: false,
    remoteCart: false,
    persistCart: false,
  }
};
