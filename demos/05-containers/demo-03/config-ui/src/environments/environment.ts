declare global {
    interface Window {
        env: any;
    }
}

export const environment = {
    api: window['env'].API_URL || "https://localhost:5001"
};
