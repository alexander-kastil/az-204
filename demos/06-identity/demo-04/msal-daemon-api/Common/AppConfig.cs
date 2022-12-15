using Newtonsoft.Json;

namespace MSALDaemon
{
    public class LogLevel
    {
        public string Default { get; set; }
        public string Microsoft { get; set; }
        
        [JsonProperty("Microsoft.Hosting.Lifetime")]
        public string MicrosoftHostingLifetime { get; set; }
    }

    public class Logging
    {
        public LogLevel LogLevel { get; set; }
    }

    public class ApplicationInsights
    {
        public string InstrumentationKey { get; set; }
    }

    public class Azure
    {
        public ApplicationInsights ApplicationInsights { get; set; }
    }

       public class GraphCfg
    {
        public string tenantId { get; set; }
        public string clientId { get; set; }
        public string clientSecret { get; set; }
        public string cacheLocation { get; set; }
        public Endpoints endpoints { get; set; }
        public string returnUrl { get; set; }
        public string mailSender { get; set; }
    }

    public class Endpoints
    {
        public string graphApiUri { get; set; }
    }

    public class AppConfig
    {
        public Logging Logging { get; set; }
        public Azure Azure { get; set; }
        public GraphCfg GraphCfg { get; set; }
        public string AllowedHosts { get; set; }
    }
}