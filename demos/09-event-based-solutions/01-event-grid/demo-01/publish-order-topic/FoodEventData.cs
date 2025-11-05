using Newtonsoft.Json;
namespace FoodApp
{
    class FoodEventData {
        [JsonProperty (PropertyName = "id")]
        public int id { get; set; }
        [JsonProperty (PropertyName = "type")]
        public string type { get; set; }
        [JsonProperty (PropertyName = "quantity")]
        public int? quantity { get; set; }
    }

    enum FoodEventType {
        Create,
        Update,
        Remove
    }
}