using System;

namespace FoodApi {
    public partial class AppConfig {
        public App App { get; set; }
        public Logging Logging { get; set; }
        public ConnectionStrings ConnectionStrings { get; set; }
        public Azure Azure { get; set; }
        public GraphCfg GraphCfg { get; set; }
    }

    public partial class App {
        public Uri FrontendUrl { get; set; }
        public string AllowedHosts { get; set; }
        public string MailSender { get; set; }
    }

    public partial class Azure {
        public ApplicationInsights ApplicationInsights { get; set; }
        public string AppConfiguration { get; set; }
    }

    public partial class ApplicationInsights {
        public Guid InstrumentationKey { get; set; }
    }

    public partial class ConnectionStrings {
        public string SqLiteDbConnection { get; set; }
        public string SqlServerConnection { get; set; }
    }

    public partial class GraphCfg {
        public Guid TenantId { get; set; }
        public Guid ClientId { get; set; }
        public string ClientSecret { get; set; }
        public string CacheLocation { get; set; }
        public Endpoints Endpoints { get; set; }
        public Uri ReturnUrl { get; set; }
    }

    public partial class Endpoints {
        public Uri GraphApiUri { get; set; }
    }

    public partial class Logging {
        public LogLevel LogLevel { get; set; }
    }

    public partial class LogLevel {
        public string Default { get; set; }
        public string Microsoft { get; set; }
        public string MicrosoftHostingLifetime { get; set; }
    }

}