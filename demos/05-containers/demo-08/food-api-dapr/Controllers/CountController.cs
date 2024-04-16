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
        string storeName = "";
        const string key = "counter";

        private readonly DaprClient client;

        public CountController(DaprClient daprClient, IConfiguration cfg)
        {
            client = daprClient;
            storeName = cfg.GetValue<string>("DAPR_STATE_STORE");
        }

        [HttpGet("get")]
        public async Task<int> Get()
        {
            var counter = await client.GetStateAsync<int>(storeName, key);
            await client.SaveStateAsync(storeName, key, counter + 1);
            return counter;
        }

        [HttpGet("reset")]
        public async Task<int> Reset()
        {
            await client.SaveStateAsync(storeName, key, 0);
            return 0;
        }
    }
}