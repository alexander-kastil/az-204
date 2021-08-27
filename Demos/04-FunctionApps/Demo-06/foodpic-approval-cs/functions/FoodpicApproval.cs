using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using ImpromptuInterface;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.DurableTask;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;

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

            outputs.Add(await context.CallActivityAsync<string>("SendApprovalRequestCard", teamsApproval));

            return outputs;
        }

        private const string ReceiveApprovalResponseEvent = "ReceiveApprovalResponse";
        
        [FunctionName(nameof(ProcessTeamsApproval))]
        public static async Task<HttpResponseMessage> ProcessTeamsApproval(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "foodpicapproval/process-teams")]HttpRequestMessage req,
        [DurableClient] IDurableOrchestrationClient orchestrationClient,
        ILogger log)
        {
            // Get approval response from HTTP body
            var teamsResponse = JsonSerializer.Deserialize<TeamsApprovalRequest>(await req.Content.ReadAsStringAsync());        
            // Get status based on orchestration Id
            var status = await orchestrationClient.GetStatusAsync(teamsResponse.OrchestrationInstanceID);
            if (status.RuntimeStatus == OrchestrationRuntimeStatus.Running || status.RuntimeStatus == OrchestrationRuntimeStatus.Pending)
            {
                log.LogInformation("Received Teams response in time, raising event");
                await orchestrationClient.RaiseEventAsync(teamsResponse.OrchestrationInstanceID,ReceiveApprovalResponseEvent, teamsResponse.Approved);
                return new HttpResponseMessage(HttpStatusCode.OK);
            }    
            return new HttpResponseMessage(HttpStatusCode.BadRequest);
        }       
    }
}