using Microsoft.Extensions.Configuration;

namespace ConfigApi
{
    public class AppConfig
    {
        public AppSettings App { get; set; } 
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
        public string Title { get; set; }
        public bool AuthEnabled { get; set; }
        public bool UseSQLite { get; set; }
        public bool UseAppConfig { get; set; }
        public string AppConfigConnection { get; set; }
        public string Environment { get; set; }
        public string MockSetting { get; set; }
        public ConnectionStrings ConnectionStrings { get; set; }
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