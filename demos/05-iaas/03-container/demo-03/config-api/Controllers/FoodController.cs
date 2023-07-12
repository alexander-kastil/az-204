using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodApi;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace AppSettingsWebApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class FoodController : ControllerBase
    {
        IConfiguration cfg;
        IWebHostEnvironment env;

        public FoodController(IConfiguration config, IWebHostEnvironment environment)
        {
            cfg = config;
            env = environment;
        }

        // https://localhost:5001/food
        [HttpGet]
        public ActionResult GetFood()
        {
           List<FoodItem> list = new List<FoodItem>();
            list.Add(new FoodItem { ID = 1, Name = "Butter Chicken", InStock = 9, Price = 12, Code = "btc"});
            list.Add(new FoodItem { ID = 2, Name = "Blini with Salmon", InStock = 12, Price = 9, Code = "bls" });
            list.Add(new FoodItem { ID = 3, Name = "Wiener Schnitzel", InStock= 23, Price = 18, Code = "ws" });
           return Ok(list);  
        }
    }
}