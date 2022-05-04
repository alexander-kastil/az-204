namespace FoodApp.Common
{
    public class ServiceBusConfig
    {
        public string ConnectionString { get; set; }
        public string Topic { get; set; }
        public string Subscription { get; set; }
    }
}