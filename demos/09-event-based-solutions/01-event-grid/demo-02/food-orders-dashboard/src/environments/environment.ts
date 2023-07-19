declare global {
  interface Window {
    env: any;
  }
}

export const environment = {
  funcWebhookEP: window['env']["FUNC_EP"] || 'https://foodorders-28324.azurewebsites.net/api',
};
