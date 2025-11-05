using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodApi;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace ConfigApi
{
    [Route("[controller]")]
    [ApiController]
    public class FoodController : ControllerBase
    {
        FoodDBContext ctx;

        public FoodController(FoodDBContext context, IConfiguration config)
        {
            ctx = context;
        }

        // http://localhost:PORT/food
        [HttpGet()]
        public IEnumerable<FoodItem> GetFood()
        {
            return ctx.Food.ToArray();
        }
    }
}