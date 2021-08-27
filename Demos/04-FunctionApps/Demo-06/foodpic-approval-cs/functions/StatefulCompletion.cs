using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.DurableTask;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;

namespace Integrations
{
    public static class StatefulCompletion
    {
        [FunctionName("StatefulCompletion")]
        public static async Task<HttpResponseMessage> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "foodpicapproval/complete")] HttpRequestMessage req,
            [DurableClient] IDurableOrchestrationClient orchclient,
            ILogger logger)
        {
            
            var eventData = await req.Content.ReadAsAsync<FoodPicApprovalCompleteData>();

            await orchclient.RaiseEventAsync(
                eventData.OrchestrationInstanceId,
                "CompleteFoodPicApproval",
                eventData);

            return req.CreateResponse(orchclient);
        }
    }
}
