using Newtonsoft.Json;
using System.Collections.Generic;

namespace FoodApp.Orders
{
    public class Order{
        public string Id {get;set;}
        public decimal Total {get;set;}
        public int CustomerId {get;set;}
        public Customer Customer {get;set;}
        public List<OrderItem> Items {get;set;}
    }

    public class Customer{
        public string Name {get;set;}
        public string EMail {get;set;}
        public string Address {get;set;}
    }
    
    public class OrderItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
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