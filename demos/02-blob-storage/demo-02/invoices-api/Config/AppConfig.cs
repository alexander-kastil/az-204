namespace FoodApp{
    public class AppConfig{
        public Logging Logging { get; set; }
        public StorageAccount StorageAccount { get; set; }
        public string AllowedHosts { get; set; }
    }
    
    public class StorageAccount
    {
        public string ConnectionString { get; set; }
        public string Container { get; set; }
        public string AccountName { get; set; }
        public string AccountKey { get; set; }
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
}