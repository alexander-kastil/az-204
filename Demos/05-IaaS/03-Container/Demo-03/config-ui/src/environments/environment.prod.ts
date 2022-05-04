declare global {
  interface Window {
    env: any;
  }
}

export const environment = {
  production: true,
  apiUrl: window['env'].API_URL,
};
