using System.Text.Json.Serialization;
using FoodApp.Common;

namespace FoodApp.OrderService
{
    internal record FoodOrderEvent : IntegrationEvent{

        public FoodOrderEvent(FoodOrder order){
            Data = order;
        }

        [JsonPropertyName("data")]
        public FoodOrder Data {get;set;}        
    }
}