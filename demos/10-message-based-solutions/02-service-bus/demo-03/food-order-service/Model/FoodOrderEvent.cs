using System.Text.Json.Serialization;
using FoodApp.Common;

namespace FoodApp.OrderService
{
    public class FoodOrderEvent : IntegrationEvent{
 
        public FoodOrderEvent(FoodOrder order){
            Data = order;
            EventId = Guid.NewGuid();
            CreationDate = DateTime.Now;
        }

        [JsonPropertyName("data")]
        public FoodOrder Data {get;set;}        
    }
}