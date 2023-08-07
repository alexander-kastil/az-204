using System.Text.Json.Serialization;

namespace FoodApp
{
    public class Order
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }
        [JsonPropertyName("customerId")]
        public int CustomerId { get; set; }
        [JsonPropertyName("type")]
        public string Type { get; set; }
        [JsonPropertyName("total")]
        public decimal Total { get; set; }
        [JsonPropertyName("customer")]
        public Customer Customer { get; set; }
        [JsonPropertyName("items")]
        public List<OrderItem> Items { get; set; }
    }

    public class Customer
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }
        [JsonPropertyName("email")]
        public string EMail { get; set; }
        [JsonPropertyName("address")]
        public string Address { get; set; }
    }

    public class OrderItem
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("name")]
        public string Name { get; set; }
        [JsonPropertyName("price")]
        public decimal Price { get; set; }
        [JsonPropertyName("quantity")]
        public int Quantity { get; set; }
    }

    public enum OrderStatus
    {
        cart,
        placed,
        paid,
        preparing,
        ready_for_delivery,
        delivered,
        rejcted
    }
}