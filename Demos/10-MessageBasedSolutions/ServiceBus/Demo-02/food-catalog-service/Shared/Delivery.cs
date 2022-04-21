namespace FoodApp.CatalogService
{
    public class Delivery{
        private decimal baseRate = 0.23M;
        public decimal getDeliveryCost(decimal Distance){
            return Distance * baseRate;
        }
    }
}