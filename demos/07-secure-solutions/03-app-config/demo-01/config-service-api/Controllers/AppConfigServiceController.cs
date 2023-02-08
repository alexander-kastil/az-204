using System.Threading.Tasks;
using Azure.Security.KeyVault.Secrets;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace config_service_api.Controllers;

[ApiController]
[Route("[controller]")]
public class AppConfigServiceController : ControllerBase
{
    IConfiguration cfg;
    SecretClient sc;

    private readonly ILogger<AppConfigServiceController> logger;

    public AppConfigServiceController(ILogger<AppConfigServiceController> ilogger, IConfiguration config, SecretClient secretClient)
    {
        cfg = config;
        logger = ilogger;
        sc = secretClient;
    }

    [HttpGet(Name = "GetConfig")]
    public ActionResult Get()
    {
        var config = cfg.Get<AppConfig>();
        return Ok(config);
    }

    [HttpGet("GetPremiumFeatureEnabled")]
    public ActionResult GetPremium()
    {
        //get string typed config
        var config = cfg.Get<AppConfig>();
        return Ok(config);
    }

    [HttpGet("GetSecretFromVault")]
    public async Task<string> GetSecretFromVault()
    {
        var response =  await sc.GetSecretAsync("conSQLite");     
        return response.Value.Value;
    }
}
