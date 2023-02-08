using System.Threading.Tasks;
using Azure.Security.KeyVault.Secrets;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace config_service_api.Controllers;

[ApiController]
[Route("[controller]")]
public class ConfigController : ControllerBase
{
    IConfiguration cfg;
    SecretClient sc;

    private readonly ILogger<ConfigController> logger;

    public ConfigController(ILogger<ConfigController> ilogger, IConfiguration config, SecretClient secretClient)
    {
        cfg = config;
        logger = ilogger;
        sc = secretClient;
    }

    [HttpGet(Name = "GetConfig")]
    public ActionResult Get()
    {
        //get string typed config
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
