using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Dapr.Client;

namespace FoodDapr
{
    [Route("[controller]")]
    [ApiController]
    public class CountController(DaprClient client, IConfiguration config) : ControllerBase
    {        
        const string key = "counter";

        [HttpGet("getCount")]
        public async Task<int> Get()
        {
            var storeName = config.GetValue<string>("STATE_STORE");
            var counter = await client.GetStateAsync<int>(storeName, key);
            await client.SaveStateAsync(storeName, key, counter + 1);
            return counter;
        }
    }
}