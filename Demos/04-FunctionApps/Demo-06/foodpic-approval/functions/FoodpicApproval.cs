using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.DurableTask;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;

namespace Integrations
{
    public static class Approval
    {

        [FunctionName("ApprovalStarter")]
        public static async Task<HttpResponseMessage> HttpStart(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post")] HttpRequestMessage req, 
            [DurableClient] IDurableOrchestrationClient starter,
            ILogger log)
        {            
            ApprovalRequest request =  JsonSerializer.Deserialize<ApprovalRequest>(await req.Content.ReadAsStringAsync());
            string instanceId = await starter.StartNewAsync("ApprovalOrchestrator", request);
            log.LogInformation($"Started orchestration with ID = '{instanceId}'.");
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        // Orchestrator
        [FunctionName("ApprovalOrchestrator")]
        public static async Task<List<string>> RunOrchestrator(
            [OrchestrationTrigger] IDurableOrchestrationContext context)
        {
            var outputs = new List<string>();
            // Get the url data and pass it to an activity function
            var data = context.GetInput<ApprovalRequest>();
            outputs.Add(await context.CallActivityAsync<string>("ApprovalSendToTeams", data.Url));

            // returns ["Hello Tokyo!", "Hello Seattle!", "Hello London!"]
            return outputs;
        }



        
        [FunctionName("ApprovalSendToTeams")]
        public static string SayHello([ActivityTrigger] string url, ILogger log)
        {
            log.LogInformation($"Sending url to Teams {url}.");
            return $"Sent url to Teams {url}!";
        }
    }
}