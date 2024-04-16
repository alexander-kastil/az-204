using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapr.Client;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace FoodDapr
{
    [Route("[controller]")]
    [ApiController]
    public class FoodController : ControllerBase
    {
        private readonly FoodDBContext ctx;
        private readonly ILogger logger;
        private readonly DaprClient client;
        private readonly  IConfiguration cfg;

        public FoodController(FoodDBContext context, ILogger<FoodController> ILogger, DaprClient daprClient, IConfiguration config)
        {
            ctx = context;
            cfg = config;
            logger = ILogger;
            client = daprClient;
        }

        // http://localhost:PORT/food
        [HttpGet()]
        public IEnumerable<FoodItem> GetFood()
        {
            return ctx.Food.ToArray();
        }

        
        [HttpPost("add")]
        public async Task<FoodItem> AddFood([FromBody] FoodItem food)
        {
            logger.LogInformation("Started processing message with food name '{0}'", food.Name);
            var existing = ctx.Food.FirstOrDefault(f => f.ID == food.ID);
            if (existing != null)
            {
                ctx.Attach(food); 
                ctx.Entry(food).State = EntityState.Modified;
            }
            else
            {
                ctx.Food.Add(food);
                logger.LogInformation("Food with ID '{0}' does not exist. Adding it", food.ID);
            }
            await ctx.SaveChangesAsync();
            await PublishFoodAdded(food);
            return food;
        }

        private async Task PublishFoodAdded(FoodItem food)
        {
            var pubsubName = cfg.GetValue<string>("PUBSUB_NAME");
            var topicName = cfg.GetValue<string>("PUBSUB_TOPIC");  
            Console.WriteLine("Publishing food with ID '{0}' to topic '{1}' in pubsub '{2}'", food.ID, topicName, pubsubName);          
            await client.PublishEventAsync(pubsubName, topicName, food);
        }
    }
}