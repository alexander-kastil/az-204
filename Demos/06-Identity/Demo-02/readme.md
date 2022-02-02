# Microsoft Identity Getting Started

[Azure App Registrations](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-apps)

[MSAL Authentication Flows](https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-authentication-flows)

[az ad app](https://docs.microsoft.com/en-us/cli/azure/ad/app?view=azure-cli-latest)

## Demos

- App Registration MSAL-Token-Flow-App
- Create App Registration using Azure CLI

### App Registration MSAL-Token-Flow-App

![appreg](_images/app-reg.jpg)

![appreg2](_images/app-reg2.jpg)

### Run Demo

Replace tanant id und client id in `index.js`:

```javascript
async function doAuth() {
  const spTenant = "integrationsonline";
  const config = {
    auth: {
      clientId: "a2d2aa7-c9dc-47ef-899a-2258409bc7c4",
      authority: "https://login.microsoftonline.com/common/",
      redirectUri: "http://localhost:8080",
    },
  };
```

Install http-server:

```
npm i -g http-server
```

> Note: Requires [Note.js](https://nodejs.org/download/release/v10.23.0/)

Run project:

```
cd ./token-flow-node
npm i
http-server
```

> Note: Use http://localhost:8080/ as this is used in the App Registation

Consent Screen:

![consent](_images/consent.jpg)

### Create App Registration using Azure CLI

Examine and execute `create-appreg.azcli`