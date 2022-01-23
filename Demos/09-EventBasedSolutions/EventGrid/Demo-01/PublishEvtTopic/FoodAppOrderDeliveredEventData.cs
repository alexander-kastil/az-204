using Newtonsoft.Json;

namespace PublishTopic
{
    class FoodAppOrderDeliveredEventData {
        [JsonProperty (PropertyName = "itemSku")]
        public string OrderNumber { get; set; }
    }
}
