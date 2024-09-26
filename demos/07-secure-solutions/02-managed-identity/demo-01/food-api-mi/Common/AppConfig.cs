
namespace FoodApi
{
    public class AppConfig
    {
        public AppSettings App { get; set; }
        public LoggingConfig Logging { get; set; }
        public ConnectionStringsConfig ConnectionStrings { get; set; }
        public AzureConfig Azure { get; set; }

        public class AppSettings
        {
            public string FrontendUrl { get; set; }
            public string AllowedHosts { get; set; }
        }

        public class LoggingConfig
        {
            public LogLevelConfig LogLevel { get; set; }

            public class LogLevelConfig
            {
                public string Default { get; set; }
                public string Microsoft { get; set; }
                public string MicrosoftHostingLifetime { get; set; }
            }
        }

        public class ConnectionStringsConfig
        {
            public string SQLiteDBConnection { get; set; }
            public string SQLServerConnection { get; set; }
        }

        public class AzureConfig
        {
            public ApplicationInsightsConfig ApplicationInsights { get; set; }
            public string AppConfiguration { get; set; }
            public string KevVault { get; set; }

            public class ApplicationInsightsConfig
            {
                public string InstrumentationKey { get; set; }
            }
        }
    }
}