declare global {
  interface Window {
    env: any;
  }
}

export const environment = {
  funcWebhookEP: window['env']["FUNC_EP"] || 'https://foodorders-31135.azurewebsites.net/api',
};
