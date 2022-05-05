using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using FoodApp.Common;

namespace FoodApp.CatalogService
{
    [Route("[controller]")]
    [ApiController]
    public class ConfigController : ControllerBase
    {
        IConfiguration cfg;
        IWebHostEnvironment env;

        public ConfigController(IConfiguration config, IWebHostEnvironment environment)
        {
            cfg = config;
            env = environment;
        }

        // https://localhost:5001/config/
        [HttpGet]
        public ActionResult GetConfig()
        {
           //access a single key
           var useSQLite = cfg.GetValue<string>("AppSettings:UseSQLite");
           
           //get string typed config
           var config = cfg.Get<FoodConfig>();
           return Ok(config);  
        }

        // https://localhost:5001/config/getAllEnv
        [HttpGet("getAllEnv")]
        public ActionResult GetAllEnv()
        {
            var val = Environment.GetEnvironmentVariables();
            return Ok(val);  
        }
    }
}