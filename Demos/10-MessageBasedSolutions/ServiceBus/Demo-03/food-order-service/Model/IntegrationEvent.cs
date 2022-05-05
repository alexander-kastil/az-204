using System;
using System.Text.Json.Serialization;

namespace FoodApp.Common
{
    public abstract record IntegrationEvent
    {
        [JsonPropertyName("eventId")]
        public Guid EventId { get; set; }

        [JsonPropertyName("creationDate")]
        public DateTime CreationDate { get; set; }

        [JsonPropertyName("eventType")]
        public string EventType {get;set;}
    }
}
