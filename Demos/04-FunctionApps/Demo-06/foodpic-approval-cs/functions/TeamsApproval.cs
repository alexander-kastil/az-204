using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.DurableTask;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;

namespace Integrations
{
    // public static class TeamsApproval
    // {
    //     [FunctionName("SendApprovalRequestCard")]
    //     public async static Task<string> SendApprovalRequestCard(
    //         // [ActivityTrigger] TeamsApprovalRequest tr, 
    //         [OrchestrationTrigger] IDurableOrchestrationContext context,
    //         // [ActivityTrigger] IDurableActivityContext context,
    //         ILogger log)
    //     {
    //         var approval = context.GetInput<ApprovalRequest>();
    //         TeamsApprovalRequest teamsApproval = new TeamsApprovalRequest(){InitialRequest = approval};
    //         log.LogInformation($"Sending url to Teams {teamsApproval.InitialRequest.PicUrl}.");

    //         JObject card = JObject.Parse(File.ReadAllText("card.json"));
                  
    //         var result = await context.CallHttpAsync(HttpMethod.Post, new System.Uri(teamsApproval.InitialRequest.PicUrl),teamsApproval.InitialRequest.PicUrl);   

    //         return $"Sent url to Teams {teamsApproval.InitialRequest.PicUrl}!";
    //     }
    // }
}    