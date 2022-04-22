namespace FoodApp.ServiceBus
{
    public class ServiceBusConfig
    {
        public string ConnectionString { get; set; }
        public string Topic { get; set; }
        public string Subscription { get; set; }
    }
}