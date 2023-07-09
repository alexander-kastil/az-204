using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.DurableTask;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;

namespace Integrations
{
    public static class ShoppingCartOrchestration
    {
        [FunctionName("ShoppingCartStarter")]
        public static async Task<HttpResponseMessage> HttpStart(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "foodcart/start")] HttpRequestMessage req,
            [DurableClient] IDurableOrchestrationClient starter,
            ILogger log)
        {
            // Function input comes from the request content.
            string instanceId = await starter.StartNewAsync("ShoppingCartOrchestration", null);
            log.LogInformation($"Started shop orchestration with ID = '{instanceId}'.");
            return starter.CreateCheckStatusResponse(req, instanceId);
        }

        [FunctionName("ShoppingCartOrchestration")]
        public static async Task<List<FoodModel>> RunOrchestrator(
            [OrchestrationTrigger] IDurableOrchestrationContext context,
            ILogger log)
        {
            var food = context.GetInput<List<FoodModel>>() ?? new List<FoodModel>();

            //define activities and get current activity
            var addFoodTask = context.WaitForExternalEvent<FoodModel>("AddFood");
            var removeFoodTask = context.WaitForExternalEvent<FoodRemoveModel>("RemoveFood");
            var completeTask = context.WaitForExternalEvent<FoodCompleteModel>("CompleteShopping");
            
            var evt = await Task.WhenAny(addFoodTask, removeFoodTask, completeTask);

            //handle activities
            if (evt == addFoodTask)
            {
                var exists = food.Find(f => f.ID == addFoodTask.Result.ID);
                if (exists != null)
                {
                    exists.Amount += addFoodTask.Result.Amount;
                    log.LogInformation($"Food {addFoodTask.Result.Name} already exists in foodlist updating quantity");
                }
                else
                {
                    food.Add(addFoodTask.Result);
                    log.LogInformation($"Added food {addFoodTask.Result.Name} to foodlist");
                }
            }
            
            if (evt == removeFoodTask)
            {
                food.RemoveAll(f => f.ID == removeFoodTask.Result.ID);
            }
            
            if (evt == completeTask )
            {
                log.LogInformation($"Foodlist orchestration completed");
            }
            else
            {
                context.ContinueAsNew(food);
            }

            return food;
        }
    }
}