using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.DurableTask;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;

namespace Integrations
{
    public static class Approval
    {

        [FunctionName("ApprovalStarter")]
        public static async Task<HttpResponseMessage> HttpStart(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "foodpicapproval/start")] HttpRequestMessage req, 
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
            [OrchestrationTrigger] IDurableOrchestrationContext context,
            ExecutionContext executionContext,
            ILogger log)
        {
            var outputs = new List<string>();
            var approval = context.GetInput<ApprovalRequest>();

            var TeamsReturnUrl = Environment.GetEnvironmentVariable("TeamsReturnUrl");
            var TeamsWebhook = Environment.GetEnvironmentVariable("TeamsWebhook");
            string cardPath = Path.Combine(executionContext.FunctionAppDirectory, "cards", "card.json");
            string card = File.ReadAllText(cardPath);                  

            TeamsApprovalRequest teamsApproval = new TeamsApprovalRequest(){PicUrl = approval.PicUrl, OrchestrationInstanceID = context.InstanceId, ReturnUrl = TeamsReturnUrl};        
            var result = await context.CallHttpAsync(HttpMethod.Post, new Uri( TeamsWebhook), card);   
            log.LogInformation($"Starting Teams approval for: {teamsApproval.PicUrl}.");

            var processTeamsResponse = context.WaitForExternalEvent<TeamsApprovalResponse>("ProcessTeamsResponse");
            var isCompleteTask = context.WaitForExternalEvent<bool>("CompleteFoodOrchestration");

            var resultingEvent = await Task.WhenAny(processTeamsResponse, isCompleteTask);

            if(resultingEvent == processTeamsResponse){
                approval.Approved = processTeamsResponse.Result.Approved;
                log.LogInformation($"Approval Request for Url {approval.PicUrl} was {approval.Approved}");                
            }

            if(resultingEvent == isCompleteTask && isCompleteTask.Result){
                log.LogInformation($"Approval Request for Url {approval.PicUrl} completed");
            }
            else{
                context.ContinueAsNew(approval);
            }

            return outputs;
        }
    }
}