using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.DurableTask;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;

namespace Integrations
{
    public static class ShoppingCartCompletion
    {
        [FunctionName("ShoppingCartCompletion")]
        public static async Task<HttpResponseMessage> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "foodcart/complete")] HttpRequestMessage req,
            [DurableClient] IDurableOrchestrationClient orchclient,
            ILogger logger)
        {
            
            var eventData = await req.Content.ReadAsAsync<FoodCompleteData>();

            await orchclient.RaiseEventAsync(
                eventData.OrchestrationInstanceId,
                "CompleteShopping",
                eventData);

            return req.CreateResponse(orchclient);
        }
    }
}
