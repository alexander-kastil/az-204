declare global {
  interface Window {
    env: any;
  }
}

export const environment = {
  funcWebhookEP: window['env']["FUNC_EP"] || 'https://foodorders-15743.azurewebsites.net/api',
};
