using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;
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
        ICosmosDbService service;

        public OrdersController(IConfiguration config, IWebHostEnvironment environment, CosmosClient cosmosClient, ICosmosDbService cs,  AILogger aILogger)
        {
            cfg = config.Get<AppConfig>(); ;
            env = environment;
            client = cosmosClient;
            logger = aILogger;
            service = cs;
        }

        // http://localhost:PORT/orders/add
        [HttpPost()]
        [Route("add")]
        public async Task AddOrder(Order order)
        {
            await service.AddOrderAsync(order);
        }

        // use cosmos client
        // http://localhost:5002/orders/getOrders
        [HttpGet()]
        [Route("getOrders")]
        public Order[] GetAllOrders()
        {
            Database database = client.GetDatabase(cfg.CosmosDB.DBName);
            Container container = database.GetContainer(cfg.CosmosDB.Container);

            var sql = "SELECT * FROM orders o where o.type='order'";
            QueryDefinition qry = new QueryDefinition(sql);
            FeedIterator<Order> feed = container.GetItemQueryIterator<Order>(qry);

            List<Order> orders = new List<Order>();
            while (feed.HasMoreResults)
            {
                FeedResponse<Order> response = feed.ReadNextAsync().Result;
                foreach (Order od in response)
                {
                    orders.Add(od);
                    Console.WriteLine("\tRead {0}\n", od.CustomerId);
                }

            }
            return orders.ToArray();
        }
    }
}