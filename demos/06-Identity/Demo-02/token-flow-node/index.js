async function doAuth() {
    //Sharepoint Tenant
    const spTenant = "integrationsonline";

    const config = {
        auth: {
            clientId: "eeb155cb-d4c6-4864-9184-cf10a6e02715",
            authority: "https://login.microsoftonline.com/d92b247e-90e0-4469-a129-6a32866c0d0a/",
            redirectUri: "http://localhost:8080",
        },
    };

    //Creadte MSAL App with Scope to read User Profile
    const client = new Msal.UserAgentApplication(config);
    const scopes = {
        scopes: ["user.read"],
    };

    //Login -> Get ID Token
    const loginResponse = await client
        .loginPopup(scopes)
        .then((loginResponse) => {
            console.log("id_token acquired at: " + new Date().toString());
            console.log("LoginResponse", loginResponse);

            if (client.getAccount()) {
                console.log("Account", client.getAccount());
            }
        })
        .catch((error) => {
            console.log(error);
        });

    //Get AccessToken
    const tokenResponse = await client.acquireTokenSilent(scopes);
    console.log("Token Response", tokenResponse);

    //Read Profile
    const qryProfile = "https://graph.microsoft.com/v1.0/me/";
    const profileResp = await fetch(qryProfile, {
        headers: {
            Authorization: "Bearer " + tokenResponse.accessToken,
        },
    });
    const profile = await profileResp.json();
    console.log("Profile", profile);
}
