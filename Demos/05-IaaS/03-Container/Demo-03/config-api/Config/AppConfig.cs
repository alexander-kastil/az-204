using Microsoft.Extensions.Configuration;

namespace AppSettingsWebApi
{
    public class AppConfig
    {
        public AppSettings App { get; set; } 
        public Azure Azure { get; set; } 
        public Logging Logging { get; set; }
        public string AllowedHosts { get; set; }
    }

    public class ConnectionStrings
    {
        public string SQLiteDBConnection { get; set; }

        public string SQLServerConnection { get; set; } 
    }

    public class AppSettings
    {
        public bool AuthEnabled { get; set; }
        public bool UseSQLite { get; set; }
        public bool UseAppConfig { get; set; }
        public bool UseEnv {get;set;}
        public ConnectionStrings ConnectionStrings { get; set; }
    }

    public class Azure    {
        public string TenantId { get; set; } 
        public string ClientId { get; set; } 
        public string Instance {get;set;}
        public string cacheLocation { get; set; } 
        public string ApplicationInsights { get; set; } 
        public string AppConfiguration { get; set; } 
        public string KeyVault { get; set; } 
    }   
    
    public class LogLevel
    {
        public string Default { get; set; }
        public string Microsoft { get; set; }
        public string MicrosoftHostingLifetime { get; set; }
    }

    public class Logging
    {
        public LogLevel LogLevel { get; set; }
    }
}