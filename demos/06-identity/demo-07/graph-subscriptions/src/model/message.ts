type MessageData = {
    SubscriptionId: string;
    SubscriptionExpirationDateTime: string;
    ChangeType: string;
    Resource: string;
    ResourceData: {
        '@odata.type': string;
        '@odata.id': string;
        '@odata.etag': string;
        Id: string;
    };
};