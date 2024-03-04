using Microsoft.ApplicationInsights.Channel;
using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.Extensions.Configuration;

namespace FoodApp
{
    public class FoodTelemetryInitializer : ITelemetryInitializer{

        AppConfig config;
        public FoodTelemetryInitializer(IConfiguration iconfig)
        {
            config = iconfig.Get<AppConfig>();
        }

        public void Initialize(ITelemetry telemetry)
        {            
            if (string.IsNullOrEmpty(telemetry.Context.Cloud.RoleName))
            {
                telemetry.Context.Cloud.RoleName = config.Title;
            }
        }
    }
}