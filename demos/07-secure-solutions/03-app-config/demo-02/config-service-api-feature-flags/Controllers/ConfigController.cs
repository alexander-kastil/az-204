using System.Threading.Tasks;
using Azure.Security.KeyVault.Secrets;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.FeatureManagement;

namespace config_service_api.Controllers;

[ApiController]
[Route("[controller]")]
public class ConfigController : ControllerBase
{
    IConfiguration cfg;
    SecretClient sc;
    IFeatureManager fm;

    private readonly ILogger<ConfigController> logger;

    public ConfigController(ILogger<ConfigController> ilogger, IConfiguration config, SecretClient secretClient, IFeatureManager featureManager)
    {
        cfg = config;
        logger = ilogger;
        sc = secretClient;
        fm = featureManager;
    }

    [HttpGet(Name = "GetConfig")]
    public ActionResult Get()
    {
        var config = cfg.Get<AppConfig>();
        return Ok(config);
    }

    [HttpGet("GetPremiumFeatureEnabled")]
    public async Task<ActionResult> GetPremium()
    {
        var premiumEnabled = await fm.IsEnabledAsync("PremiumFeature");
        return Ok(premiumEnabled);
    }

    [HttpGet("GetSecretFromVault")]
    public async Task<string> GetSecretFromVault()
    {
        var response =  await sc.GetSecretAsync("conSQLite");     
        return response.Value.Value;
    }
}
