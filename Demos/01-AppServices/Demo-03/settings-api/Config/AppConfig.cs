using Microsoft.Extensions.Configuration;

public class AppConfig
{        
        public Logging Logging { get; set; }
        public string AllowedHosts { get; set; }
        public AppSettings AppSettings { get; set; }
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

    public class ConnectionStrings
    {
        public string SQLiteDBConnection { get; set; }
    }

    public class AppSettings
    {
        public bool AuthEnabled { get; set; }
        public bool UseSQLite { get; set; }
        public bool UseAppConfig { get; set; }
        public ConnectionStrings ConnectionStrings { get; set; }
    }