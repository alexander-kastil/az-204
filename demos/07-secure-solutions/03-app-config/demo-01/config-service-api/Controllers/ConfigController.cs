using Microsoft.AspNetCore.Mvc;

namespace config_service_api.Controllers;

[ApiController]
[Route("[controller]")]
public class ConfigController : ControllerBase
{
    IConfiguration cfg;
    IWebHostEnvironment env;

    private readonly ILogger<ConfigController> _logger;

    public ConfigController(ILogger<ConfigController> logger, IConfiguration config, IWebHostEnvironment environment)
    {
        cfg = config;
        env = environment;
        _logger = logger;
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
    public ActionResult GetSecretFromVault()
    {
        //get string typed config
        var config = cfg.Get<AppConfig>();
        return Ok(config);
    }
}
