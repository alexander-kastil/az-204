import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import * as msal from '@azure/msal-node';
import axios from 'axios';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const GRAPH_DEFAULT_SCOPE = 'https://graph.microsoft.com/.default';

    const teamsId = req.body && req.body.teamsId;
    const channelId = req.body && req.body.channelId;
    const msg = req.body && req.body.message;

    if (!teamsId || !msg) {
        context.res = {
            status: 400,
            body: 'Please pass a teamid and message in the request body',
        };
        return;
    }

    const msalConfig = {
        auth: {
            clientId: process.env['clientID'],
            authority: 'https://login.microsoftonline.com/' + process.env['tenantID'],
            clientSecret: process.env['secret'],
        },
    };

    const app = new msal.ConfidentialClientApplication(msalConfig);

    if (app) {
        const redirectUri = process.env['redirectUri'];

        const clientCredentialRequest = {
            scopes: [GRAPH_DEFAULT_SCOPE],
            resourceRequestUri: redirectUri,
        };

        const token = await app.acquireTokenByClientCredential(clientCredentialRequest);

        const req = {
            body: {
                content: msg,
            },
        };

        const url = 'https://graph.microsoft.com/v1.0/teams/' + teamsId + '/channels/' + channelId + '/messages';

        const resp = await axios.post(url, req, {
            headers: {
                Authorization: `Bearer ${token.accessToken}`,
            },
        });

        // let resp = await app.getAuthCodeUrl(authCodeUrlParameters).catch((error) => console.log(JSON.stringify(error)));

        // console.log('response', resp);

        // const tokenRequest = {
        //     code: 'authorization_code',
        //     redirectUri: redirectUri,
        //     scopes: [GRAPH_DEFAULT_SCOPE],
        // };

        // app.acquireTokenByCode(tokenRequest)
        //     .then((response) => {
        //         console.log('\nResponse: \n:', response);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });

        // console.log('token', token);
    }

    context.res = {
        status: 200,
    };
};

export default httpTrigger;
