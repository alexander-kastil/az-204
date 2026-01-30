using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.FeatureManagement;

namespace FoodApp
{
    [Route("[controller]")]
    [ApiController]
    public class ConfigController(IConfiguration cfg, IFeatureManager featureManager) : ControllerBase
    {

        // https://localhost:5001/config/
        [HttpGet]
        public ActionResult GetConfig()
        {
            //access a single key
            var useSQLite = cfg.GetValue<string>("AppSettings:UseSQLite");

            //get string typed config
            var config = cfg.Get<AppConfig>();
            return Ok(config);
        }

        // https://localhost:5001/config/getEnvVars
        [HttpGet("getEnvVars")]
        public ActionResult GetEnvVars()
        {
            var val = Environment.GetEnvironmentVariables();
            return Ok(val);
        }

        // https://localhost:5001/config/getFeatureFlags
        [HttpGet("getFeatureFlags")]
        public async Task<ActionResult> GetFeatureFlags()
        {
            var flags = new Dictionary<string, bool>();
            var featureNames = new[] { "PremiumFeature" };

            foreach (var featureName in featureNames)
            {
                flags[featureName] = await featureManager.IsEnabledAsync(featureName);
            }

            return Ok(flags);
        }
    }
}