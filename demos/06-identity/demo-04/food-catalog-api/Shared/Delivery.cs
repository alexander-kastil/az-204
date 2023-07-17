namespace FoodApi
{
    public class Delivery{
        private decimal baseRate = 0.2M;
        public decimal getDeliveryCost(decimal Distance){
            return Distance * baseRate;
        }
    }
}