using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.DurableTask;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;

namespace Integrations
{
    public static class StatefulOrchestration
    {
        [FunctionName("StatefulStarter")]
        public static async Task<HttpResponseMessage> HttpStart(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = "food/start")] HttpRequestMessage req,
            [DurableClient] IDurableOrchestrationClient starter,
            ILogger log)
        {
            string instanceId = await starter.StartNewAsync("StatefulOrch", null);

            log.LogInformation($"Started orchestration with ID = '{instanceId}'.");

            return starter.CreateCheckStatusResponse(req, instanceId);
        }


        [FunctionName("StatefulOrch")]
        public static async Task<List<FoodModel>> RunOrchestrator(
            [OrchestrationTrigger] IDurableOrchestrationContext context,
            ILogger log)
        {
            var food = context.GetInput<List<FoodModel>>() ?? new List<FoodModel>();
            // Define Events
            var addFoodTask = context.WaitForExternalEvent<FoodModel>("AddFood");            
            var removeFoodTask = context.WaitForExternalEvent<FoodModel>("RemoveFood");
            var isCompleteTask = context.WaitForExternalEvent<bool>("CompleteFoodOrchestration");

            var resultingEvent = await Task.WhenAny(addFoodTask, removeFoodTask, isCompleteTask);
            
            if(resultingEvent == addFoodTask){
                food.Add(addFoodTask.Result);
                log.LogInformation($"Added food {addFoodTask.Result.Name} to foodlist");                
            } 
            else if (resultingEvent == removeFoodTask){
                FoodModel item = removeFoodTask.Result;
                var removed = food.Remove(item);
                log.LogInformation($"Removed food {addFoodTask.Result.Name} from foodlist");  
            }

            if(resultingEvent == isCompleteTask && isCompleteTask.Result){
                log.LogInformation($"Foodlist orchestration completed");
            }
            else{
                context.ContinueAsNew(food);
            }

            return food;
        }       
    }
}