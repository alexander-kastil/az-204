declare global {
  interface Window {
    env: any;
  }
}

export const environment = {
  production: false,
  apiUrl: window['env'].API_URL,
};
