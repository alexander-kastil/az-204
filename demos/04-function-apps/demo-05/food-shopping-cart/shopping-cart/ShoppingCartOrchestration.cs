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
            var removeFoodTask = context.WaitForExternalEvent<FoodModel>("RemoveFood");
            var completeTask = context.WaitForExternalEvent<bool>("CompleteShopping");
            var evt = await Task.WhenAny(addFoodTask,  removeFoodTask, completeTask);

            //handle activity
            if(evt == addFoodTask){
                food.Add(addFoodTask.Result);
                log.LogInformation($"Added food {addFoodTask.Result.Name} to foodlist");                
            } 
            if(evt == removeFoodTask){
                food.RemoveAll(f=>f.ID == removeFoodTask.Result.ID);
                log.LogInformation($"Removed food {addFoodTask.Result.Name} from foodlist");                
            } 
            if(evt == completeTask && completeTask.Result){
                log.LogInformation($"Foodlist orchestration completed");
            }
            else{
                context.ContinueAsNew(food);
            }

            return food;
        }
    }
}