public class AppSettings
{
    public string Title { get; set; }
    public bool AuthEnabled { get; set; }
    public string DBConnectionString { get; set; }
    public string KeyVault { get; set; }
    public string AppConfigEndpoint { get; set; }
    public string Sentinel { get; set; }
    public string Environment { get; set; }
}

public class FeatureManagement
{
    public bool PremiumFeature { get; set; }
}

public class Logging
{
    public LogLevel LogLevel { get; set; }
}

public class LogLevel
{
    public string Default { get; set; }
    public string Microsoft { get; set; }
    public string MicrosoftHostingLifetime { get; set; }
}

public class AppConfig
{
    public Logging Logging { get; set; }
    public string AllowedHosts { get; set; }
    public AppSettings Settings { get; set; }
    public FeatureManagement FeatureManagement { get; set; }
}