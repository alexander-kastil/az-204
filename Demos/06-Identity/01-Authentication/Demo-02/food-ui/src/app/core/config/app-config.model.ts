export class AppConfig {
  apiUrl: string;
  applicationInsights: string;
  azure: AzureAppReg;
}

export class AzureAppReg {
  clientId: string;
  authority: string;
  redirectUri: string;
}
