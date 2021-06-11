using Newtonsoft.Json;
namespace FoodApp
{
    class OrderDeliveredEventData {
        [JsonProperty (PropertyName = "OrderNumber")]
        public string OrderNumber { get; set; }
    }
}