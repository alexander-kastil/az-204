namespace FoodApp.OrderService
{
    public class FoodOrder{
        public int ID { get; set; }
        public int CustomerID {get;set;}
        public int FoodItemID {get;set;}
        public int Amount {get;set;}
        public decimal Price {get;set;}
    }
}