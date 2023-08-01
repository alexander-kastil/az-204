using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace AppSettingsWebApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SettingsController : ControllerBase
    {

        IConfiguration cfg;
        IWebHostEnvironment env;

        public SettingsController(IConfiguration config, IWebHostEnvironment environment)
        {
            cfg = config;
            env = environment;
        }

        // https://localhost:5001/settings
        [HttpGet]
        public ActionResult GetSettings()
        {          
           //get string typed config
           var config = cfg.Get<AppConfig>();
           return Ok(config);  
        }

                // https://localhost:5001/getCorsSettings
        [HttpGet("getCorsSettings")]
        public ActionResult GetCorsSettings()
        {
           //access a single key - untyped
           var cors = cfg.GetValue<string>("AppSettings:EnableCors");           
           return Ok(cors);  
        }

        // Access environment variables
        // https://localhost:5001/settings/getWindir
        [HttpGet("getWindir")]
        public ActionResult GetEnv()
        {
            var val = Environment.GetEnvironmentVariable("windir");
            return Ok(val);  
        }

        
    }
}