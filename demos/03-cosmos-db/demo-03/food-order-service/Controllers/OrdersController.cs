using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos;

namespace FoodApp.Orders
{
    [Route("[controller]")]
     [ApiController]
    public class OrdersController : ControllerBase
    {
        AppConfig cfg;
        IWebHostEnvironment env;
        CosmosClient client;
        AILogger logger;

        public OrdersController(IConfiguration config, IWebHostEnvironment environment, CosmosClient cosmosClient, AILogger aILogger)
        {
            cfg = config.Get<AppConfig>();;
            env = environment;
            client = cosmosClient;
            logger = aILogger;
        }

        // http://localhost:PORT/orders/add
        [HttpPost()]
        [Route("add")]
        public async Task<Order> AddOrder(Order order)
        {
            Database database = client.GetDatabase(cfg.CosmosDB.DBName);
            Container container = database.GetContainer(cfg.CosmosDB.Container);
            var result = await container.UpsertItemAsync<Order>(order);            
            return result.Resource;
        }

    }
}