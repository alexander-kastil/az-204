using System.Collections.Generic;
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
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = "food/start-collection")] HttpRequestMessage req,
            [DurableClient] IDurableOrchestrationClient starter,
            ILogger log)
        {
            string instanceId = await starter.StartNewAsync("StatefulOrch", null);

            log.LogInformation($"Started orchestration with ID = '{instanceId}'.");

            return starter.CreateCheckStatusResponse(req, instanceId);
        }


        [FunctionName("StatefulOrch")]
        public static async Task<List<FoodItem>> RunOrchestrator(
            [OrchestrationTrigger] IDurableOrchestrationContext context,
            ILogger log)
        {
            var food = context.GetInput<List<FoodItem>>() ?? new List<FoodItem>();

            var addFoodTask = context.WaitForExternalEvent<FoodItem>("AddFood");
            var removeFoodTask = context.WaitForExternalEvent<FoodItem>("RemoveFood");
            var isCompleteTask = context.WaitForExternalEvent<bool>("CompleteFoodOrchestration");

            var resultingEvent = await Task.WhenAny(addFoodTask, removeFoodTask, isCompleteTask);
            
            if(resultingEvent == addFoodTask){
                food.Add(addFoodTask.Result);
                log.LogInformation($"Added food {addFoodTask.Result.Name} to foodlist");                
            } 
            else if (resultingEvent == removeFoodTask){
                food.Remove(removeFoodTask.Result);
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