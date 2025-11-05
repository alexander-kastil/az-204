declare global {
  interface Window {
    env: any;
  }
}

export const environment = {
  production: true,
  title: 'Food Shop',
  authEnabled: true,
  mockCheckout: true,
  catalogApi: window['env'].CATALOG_API_URL || 'http://localhost:5001/',
  ordersApi: window['env'].ORDERS_API_URL || 'http://localhost:5002/',
  azure: {
    apimSubscriptionKey: window['env'].APIM_KEY || "39fc8b24086a4346a6317d047869f983",
    applicationInsights: window['env'].APPLICATION_INSIGHTS || '89094b1f-dde1-4c07-8d40-f7d01ef18d55'
  },
  features: {
    logging: false,
    remoteCart: false,
    persistCart: false,
  }
};
