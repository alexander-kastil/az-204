namespace MSALDaemon
{
    public class GraphCfg
    {
        public string tenantId { get; set; }
        public string clientId { get; set; }
        public string clientSecret { get; set; }
        public string cacheLocation { get; set; }
        public Endpoints endpoints { get; set; }
        public string returnUrl { get; set; }
        public string mailSender { get; set; }
        public string frontendUrl { get; set; }
    }

    public class Endpoints
    {
        public string graphApiUri { get; set; }
    }
}