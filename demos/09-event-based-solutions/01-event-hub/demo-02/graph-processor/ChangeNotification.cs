using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Integrations
{
    public class GraphChangeNotificationPayload
    {
        [JsonPropertyName("value")]
        public List<ChangeNotification> Value { get; set; }
    }

    public class ChangeNotification
    {
        [JsonPropertyName("subscriptionId")]
        public string SubscriptionId { get; set; }

        [JsonPropertyName("subscriptionExpirationDateTime")]
        public DateTime SubscriptionExpirationDateTime { get; set; }

        [JsonPropertyName("changeType")]
        public string ChangeType { get; set; }

        [JsonPropertyName("resource")]
        public string Resource { get; set; }

        [JsonPropertyName("resourceData")]
        public ResourceData ResourceData { get; set; }

        [JsonPropertyName("clientState")]
        public string ClientState { get; set; }

        [JsonPropertyName("tenantId")]
        public string TenantId { get; set; }
    }

    public class ResourceData
    {
        [JsonPropertyName("@odata.type")]
        public string OdataType { get; set; }

        [JsonPropertyName("@odata.id")]
        public string OdataId { get; set; }

        [JsonPropertyName("@odata.etag")]
        public string OdataEtag { get; set; }

        [JsonPropertyName("id")]
        public string Id { get; set; }
    }
}