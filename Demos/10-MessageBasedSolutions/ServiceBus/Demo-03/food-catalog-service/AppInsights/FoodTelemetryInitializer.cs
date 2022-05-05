using Microsoft.ApplicationInsights.Channel;
using Microsoft.ApplicationInsights.Extensibility;

namespace FoodApp.CatalogService
{
    public class FoodTelemetryInitializer : ITelemetryInitializer{

        public void Initialize(ITelemetry telemetry)
        {
            if (string.IsNullOrEmpty(telemetry.Context.Cloud.RoleName))
            {
                telemetry.Context.Cloud.RoleName = "net-food-api";
                // telemetry.Context.Cloud.RoleInstance = "Custom RoleInstance";
            }
        }
    }
}