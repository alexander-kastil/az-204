using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using FoodApi;

namespace ConfigApi
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
           //access a single key
           var useSQLite = cfg.GetValue<string>("AppSettings:UseSQLite");
           
           //get string typed config
           var config = cfg.Get<AppConfig>();
           return Ok(config);  
        }

        // https://localhost:5001/settings/getAllEnv
        [HttpGet("getAllEnv")]
        public ActionResult GetAllEnv()
        {
            var val = Environment.GetEnvironmentVariables();
            return Ok(val);  
        }
    }
}