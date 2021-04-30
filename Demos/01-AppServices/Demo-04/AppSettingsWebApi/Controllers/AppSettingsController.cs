using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace AppSettingsWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppSettingsController : ControllerBase
    {

        AppConfig cfg;

        public AppSettingsController(IOptions<AppConfig> appconfig)
        {
            cfg = (AppConfig)appconfig.Value;
        }

        public ActionResult GetTModels()
        {
           return Ok(cfg.TestKey);  
        }

        
    }
}