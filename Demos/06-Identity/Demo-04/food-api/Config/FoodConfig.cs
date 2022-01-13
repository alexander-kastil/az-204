namespace FoodApp
{
    public class FoodConfig    {
        public AppConfig App { get; set; } 
        public Logging Logging { get; set; } 
        public Azure Azure { get; set; } 
        public AzureAD AzureAD { get; set; } 
    }

     public class AppConfig    {
        public bool AuthEnabled { get; set; } 
        public bool UseSQLite {get;set;}
        public bool UseAppConfig {get;set;}
        public ConnectionStrings ConnectionStrings { get; set; } 
        public string mailSender { get; set; } 
    }

    public class LogLevel    {
        public string Default { get; set; } 
        public string Microsoft { get; set; }     
    }

    public class Logging    {
        public LogLevel LogLevel { get; set; } 
    }

    public class ConnectionStrings    {
        public string SQLiteDBConnection { get; set; } 
        public string SQLServerConnection { get; set; } 
    }

    public class ApplicationInsights    {
        public string InstrumentationKey { get; set; } 
    }

    public class Azure    {
        public ApplicationInsights ApplicationInsights { get; set; } 
        public string AppConfiguration { get; set; } 
        public string KeyVault { get; set; } 
    }

    public class Endpoints    {
        public string graphApiUri { get; set; } 
    }

    public class AzureAD    {
        public string TenantId { get; set; } 
        public string ClientId { get; set; } 
        public string Instance {get;set;}
        public string cacheLocation { get; set; } 
        public Endpoints endpoints { get; set; } 
    }
}