namespace FoodApp
{
    public class AppConfig    {
        public FoodCatalogApiConfig FoodCatalogApi { get; set; } 
        public Azure Azure { get; set; } 
        public FeatureManagement FeatureManagement { get; set; } 
        public Logging Logging { get; set; } 
    }

     public class FoodCatalogApiConfig    {
        public string Title { get; set; }
        public bool AuthEnabled { get; set; } 
        public bool UseSQLite {get;set;}
        public bool UseApplicationInsights {get;set;}
        public bool UseManagedIdentity {get;set;}
        public ConnectionStrings ConnectionStrings { get; set; }       
    }

    public class AppRegistration{
        public string TenantId { get; set; } 
        public string ClientId { get; set; } 
        public string Instance {get;set;}
        public string cacheLocation { get; set; } 
    }
   
    public class Azure    {
        public string KeyVault { get; set; } 
        public string EventGridKey { get; set; }
        public string EventGridEP { get; set; }
        public AppRegistration AppReg { get; set; }
    }    

    public class ConnectionStrings    {
        public string SQLiteDBConnection { get; set; } 
        public string SQLServerConnection { get; set; } 
    }
        
    public class FeatureManagement{
        public bool PublishEvents { get; set; } 
        public bool UseHealthChecks { get; set; }
    }
    
    public class LogLevel    {
        public string Default { get; set; } 
        public string Microsoft { get; set; }     
    }

    public class Logging    {
        public LogLevel LogLevel { get; set; } 
    }
}