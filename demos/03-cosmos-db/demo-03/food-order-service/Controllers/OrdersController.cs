using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos;
using System.Drawing.Imaging;
using Microsoft.EntityFrameworkCore;

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
            cfg = config.Get<AppConfig>(); ;
            env = environment;
            client = cosmosClient;
            logger = aILogger;
        }

        // http://localhost:PORT/orders/add
        [HttpPost()]
        [Route("add")]
        public async Task<Order> AddOrder(Order order)
        {
            var opt = new JsonSerializerOptions() { WriteIndented = true };
            string strJson = JsonSerializer.Serialize<Order>(order, opt);

            var conStr = $"AccountEndpoint={cfg.CosmosDB.AccountEndpoint};AccountKey={cfg.CosmosDB.AccountKey};";
            CosmosClient client = new CosmosClient(conStr);
            Database database = client.GetDatabase(cfg.CosmosDB.DBName);
            Container container = database.GetContainer(cfg.CosmosDB.Container);

            var sqlQueryText = "SELECT * FROM orders o where o.type='order'";
            QueryDefinition queryDefinition = new QueryDefinition(sqlQueryText);
            FeedIterator<Order> queryResultSetIterator = container.GetItemQueryIterator<Order>(queryDefinition);

            List<Order> thaiFood = new List<Order>();

            while (queryResultSetIterator.HasMoreResults)
            {
                FeedResponse<Order> currentResultSet = queryResultSetIterator.ReadNextAsync().Result;
                foreach (Order od in currentResultSet)
                {
                    Console.WriteLine("\tRead {0}\n", od.CustomerId);
                }
            }

            var result = await container.CreateItemAsync<Order>(order);

            return result.Resource;
        }

        [HttpGet()]
        [Route("get")]
        public Order[] GetAllOrders()
        {
            var conStr = $"AccountEndpoint={cfg.CosmosDB.AccountEndpoint};AccountKey={cfg.CosmosDB.AccountKey};";
            CosmosClient client = new CosmosClient(conStr);
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