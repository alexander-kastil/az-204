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
    public class CountController : ControllerBase
    {        
        const string storeName = "foodstore";
        const string key = "counter";

        private readonly DaprClient client;

        public CountController(DaprClient daprClient)
        {
            client = daprClient;
        }

        [HttpGet("getCount")]
        public async Task<int> Get()
        {
            var counter = await client.GetStateAsync<int>(storeName, key);
            await client.SaveStateAsync(storeName, key, counter + 1);
            return counter;
        }
    }
}