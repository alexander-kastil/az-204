import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import * as msal from '@azure/msal-node';
import axios, { AxiosResponse } from 'axios';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const GRAPH_DEFAULT_SCOPE = 'https://graph.microsoft.com/.default';
    const user = req.body && req.body.user;

    if (!user) {
        context.res = {
            status: 400,
            body: 'Please pass a user upn in the request body',
        };
        return;
    }

    const msalConfig = {
        auth: {
            clientId: process.env['clientID'],
            authority: `https://login.microsoftonline.com/${process.env['tenantID']}`,
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
        const url = `https://graph.microsoft.com/v1.0/users/${user}`;

        const resp = await axios
            .get(url, {
                headers: {
                    Authorization: `Bearer ${token.accessToken}`,
                },
            })
            .catch((error) => {
                console.log(error);
            });

        context.res = {
            status: 200,
            body: await (resp as AxiosResponse).data,
        };
    }
};

export default httpTrigger;
