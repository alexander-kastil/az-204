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
    [Route("api/[controller]")]
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

        [HttpGet]
        public ActionResult GetSettings()
        {
           var val = cfg.GetValue<string>("TestKey");
           return Ok(val);  
        }

        [HttpGet("getEnv")]
        public ActionResult GetEnv()
        {
            var val = Environment.GetEnvironmentVariable("windir");
            return Ok(val);  
        }

        
    }
}