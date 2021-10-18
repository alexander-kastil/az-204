namespace MSALDaemon
{
    public class LogLevel
    {
        public string Default { get; set; }
        public string Microsoft { get; set; }
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

    public class AppConfig
    {

        /// <summary>
        /// 
        /// </summary>
        public Logging Logging { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public Azure Azure { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public GraphCfg GraphCfg { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string AllowedHosts { get; set; }
    }

}