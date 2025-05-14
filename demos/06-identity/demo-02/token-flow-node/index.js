/**
 * MSAL Authentication Implementation using @azure/msal-browser
 * Following Azure best practices for authentication with Microsoft Identity platform
 */

// MSAL configuration
const msalConfig = {
  auth: {
    clientId: 'eeb155cb-d4c6-4864-9184-cf10a6e02715',
    authority:
      'https://login.microsoftonline.com/d92b247e-90e0-4469-a129-6a32866c0d0a/',
    redirectUri: 'http://localhost:8080',
  },
  cache: {
    cacheLocation: 'sessionStorage', // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO.
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (!containsPii) {
          console.log(message);
        }
      },
      logLevel: msal.LogLevel.Verbose,
    },
  },
};

// Add scopes for the API you want to call
const loginRequest = {
  scopes: ['user.read'],
};

// Create PublicClientApplication instance
const msalInstance = new msal.PublicClientApplication(msalConfig);

// Initialize MSAL instance at load time
let msalInitialized = false;
msalInstance
  .initialize()
  .then(() => {
    msalInitialized = true;
    console.log('MSAL initialized successfully');
  })
  .catch((error) => {
    console.error('MSAL initialization failed', error);
  });

/**
 * Handle the authentication flow and user profile retrieval
 */
async function doAuth() {
  // Ensure MSAL is initialized before proceeding
  if (!msalInitialized) {
    try {
      await msalInstance.initialize();
      msalInitialized = true;
      console.log('MSAL initialized on demand');
    } catch (error) {
      console.error('MSAL initialization failed', error);
      document.getElementById('result').textContent =
        'Failed to initialize authentication library: ' +
        JSON.stringify(error, null, 2);
      return;
    }
  }
  try {
    // Check if there's already an account logged in
    const currentAccounts = msalInstance.getAllAccounts();

    if (currentAccounts.length === 0) {
      // No user signed in, start login process
      const loginResponse = await msalInstance.loginPopup(loginRequest);
      console.log('id_token acquired at: ' + new Date().toString());
      console.log('LoginResponse', loginResponse);

      if (loginResponse.account) {
        console.log('Account', loginResponse.account);
      }
    }

    // Get all accounts again (in case we just logged in)
    const accounts = msalInstance.getAllAccounts();

    // Use the first account if available
    if (accounts.length > 0) {
      const silentRequest = {
        scopes: ['user.read'],
        account: accounts[0],
      };

      // Get access token silently
      const tokenResponse = await msalInstance.acquireTokenSilent(
        silentRequest
      );
      console.log('Token Response', tokenResponse);

      // Read Profile with the access token
      const qryProfile = 'https://graph.microsoft.com/v1.0/me/';
      const profileResp = await fetch(qryProfile, {
        headers: {
          Authorization: 'Bearer ' + tokenResponse.accessToken,
        },
      });

      const profile = await profileResp.json();
      console.log('Profile', profile);

      // Display profile information in the UI
      document.getElementById('result').textContent = JSON.stringify(
        profile,
        null,
        2
      );
    }
  } catch (error) {
    console.error('Authentication failed', error);

    // Handle interaction required error by falling back to popup
    if (error instanceof msal.InteractionRequiredAuthError) {
      try {
        const tokenResponse = await msalInstance.acquireTokenPopup(
          loginRequest
        );
        console.log(
          'Token acquired through popup after interaction required',
          tokenResponse
        );
      } catch (popupError) {
        console.error('Error during popup authentication:', popupError);
      }
    }

    // Display error in UI
    document.getElementById('result').textContent =
      'Authentication failed: ' + JSON.stringify(error, null, 2);
  }
}
