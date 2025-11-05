namespace FoodApp.Orders{
     public class CosmosDB
    {
        public string AccountEndpoint { get; set; }
        public string AccountKey { get; set; }
        public string DBName { get; set; }
        public string Container { get; set; }

        public string GetConnectionString()
        {
            return $"AccountEndpoint={AccountEndpoint};AccountKey={AccountKey};";
        }
    }

    public class Logging
    {
        public LogLevel LogLevel { get; set; }
    }

    public class LogLevel
    {
        public string Default { get; set; }
        public string MicrosoftAspNetCore { get; set; }
    }

    public class AppConfig
    {
        public Logging Logging { get; set; }
        public CosmosDB CosmosDB { get; set; }
        public string AllowedHosts { get; set; }
    }
}