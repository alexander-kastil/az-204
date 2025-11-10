import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { SecretClient } from "@azure/keyvault-secrets";
import { DefaultAzureCredential } from "@azure/identity";

export async function getSecret(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log('HTTP trigger function processed a request.');

    let secret: string = "";
    let dbconstring: string = "";

    try {
        // Parse request body to get the secret name
        const body = await request.text();
        const data = JSON.parse(body);
        secret = data?.secret;

        if (secret) {
            // Get KeyVaultName from environment variables
            const kvName = process.env.KeyVaultName;

            if (!kvName) {
                return {
                    status: 500,
                    body: "KeyVaultName not configured in environment variables."
                };
            }

            context.log(`Obtaining secret ${secret} from ${kvName}`);

            // Create SecretClient using DefaultAzureCredential for managed identity
            const client = new SecretClient(
                `https://${kvName}.vault.azure.net/`,
                new DefaultAzureCredential()
            );

            // Get the secret value
            const response = await client.getSecret(secret);
            dbconstring = response.value || "";
        }

        const responseMessage = !secret
            ? "Param Missing. Pass a secret name in the request body."
            : `Value of ${secret} is ${dbconstring}.`;

        return {
            status: 200,
            body: responseMessage
        };

    } catch (error) {
        context.error(`Error retrieving secret: ${error}`);
        return {
            status: 500,
            body: `Error retrieving secret: ${error instanceof Error ? error.message : String(error)}`
        };
    }
}

app.http('getSecret', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: getSecret
});
