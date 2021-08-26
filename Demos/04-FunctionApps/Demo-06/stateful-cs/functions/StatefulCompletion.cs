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
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "food/complete")] HttpRequestMessage req,
            [DurableClient] IDurableOrchestrationClient orchclient,
            ILogger logger)
        {
            
            var eventData = await req.Content.ReadAsAsync<FoodCompleteData>();

            await orchclient.RaiseEventAsync(
                eventData.OrchestrationInstanceId,
                "CompleteFoodOrchestration",
                eventData);

            return req.CreateResponse(orchclient);
        }
    }
}
