import { app, EventGridEvent, InvocationContext } from "@azure/functions";
import { Client } from "@microsoft/microsoft-graph-client";
import { ClientSecretCredential } from "@azure/identity";

export async function processNotification(event: EventGridEvent, context: InvocationContext): Promise<void> {
    context.log('Event grid function processed event:', event);
    const msg = event.data as MessageData;
    const messageId = msg.ResourceData.Id;
    context.log('Fetching message with id:', messageId);
    // fetch the message using graph
    const tenantId = process.env.TENANT_ID;
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const mailbox = process.env.MAILBOX;

    // Create a client secret credential
    const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);

    // Get an access token
    credential.getToken("https://graph.microsoft.com/.default").then((result) => {
        if (result) {
            const client = Client.init({
                authProvider: (done) => {
                    done(null, result.token);
                },
            });

            client.api(`/users/${mailbox}/messages/${messageId}`)
                .get()
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    });
}

app.eventGrid('processNotification', {
    handler: processNotification
});
