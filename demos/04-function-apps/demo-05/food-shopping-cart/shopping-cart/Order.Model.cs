namespace FoodApp
{
    public class Order{

        public Order(){
            Items = new OrderItem []{};
        }

        public string Customer {get;set;}
        public string EMail {get;set;}
        public string Payment {get;set;}
        public string Address {get;set;}
        public OrderItem[] Items {get;set;}
    }

    public class OrderItem
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Quantity { get; set; }
        public string OrchestrationInstanceId { get; set; }
    }

    public class OrderRemoveModel
    {
        public int ID { get; set; }
        public string OrchestrationInstanceId { get; set; }
    }

    public class OrderCompleteModel
    {
        public string OrchestrationInstanceId { get; set; }
    }
}