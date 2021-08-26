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
    public static class StatefulOrch
    {
        [FunctionName("StatefulStarter")]
        public static async Task<HttpResponseMessage> HttpStart(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequestMessage req,
            [DurableClient] IDurableOrchestrationClient starter,
            ILogger log)
        {
            // Function input comes from the request content.
            string instanceId = await starter.StartNewAsync("StatefulOrch", null);

            log.LogInformation($"Started orchestration with ID = '{instanceId}'.");

            return starter.CreateCheckStatusResponse(req, instanceId);
        }


        [FunctionName("StatefulOrch")]
        public static async Task<List<string>> RunOrchestrator(
            [OrchestrationTrigger] IDurableOrchestrationContext context)
        {
            var food = context.GetInput<List<FoodItem>>() ?? new List<FoodItem>();

            var addFoodTask = context.WaitForExternalEvent<FoodItem>("AddFood");
            var removeFoodTask = context.WaitForExternalEvent<FoodItem>("RemoveFood");
            var isCompleteTask = context.WaitForExternalEvent<FoodItem>("isComplete");

            var resultingEvent = await Task.WhenAny(addFoodTask, removeFoodTask, isCompleteTask);
            
            if(resultingEvent == addFoodTask){
                
            } 
            else if (resultingEvent == removeFoodTask){

            }

            if(resultingEvent == isCompleteTask ){

            }
        }

        
    }

}