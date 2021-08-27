using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.DurableTask;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;

namespace Integrations
{
    public static class ProcessTeamsApproval
    {
        [FunctionName(nameof(ProcessTeamsApproval))]
        public async static Task<HttpResponseMessage> SendApprovalRequestCard(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "foodpicapproval/process-teams")] HttpRequestMessage req,
            [DurableClient] IDurableOrchestrationClient orchclient,
            ILogger logger)
        {
            var eventData = await req.Content.ReadAsAsync<TeamsApprovalResponse>();

            string eventName = req.Method == HttpMethod.Delete ? "RemoveFood" : "AddFood";

            await orchclient.RaiseEventAsync(
                eventData.OrchestrationInstanceID,
                eventName,
                eventData);

            return req.CreateResponse(HttpStatusCode.OK);
        }
    }
}    