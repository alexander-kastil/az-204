using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.DurableTask;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;

namespace Integrations
{
    public static class ShoppingCartRemoveActivity
    {
        [FunctionName(nameof(ShoppingCartRemoveActivity))]
        public static async Task<HttpResponseMessage> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "foodcart/delete")] HttpRequestMessage req,
            [DurableClient] IDurableOrchestrationClient orchclient,
            ILogger logger)
        {
            
            var eventData = await req.Content.ReadAsAsync<FoodModel>();
            string eventName = "RemoveFood";
            await orchclient.RaiseEventAsync(
                eventData.OrchestrationInstanceId,
                eventName,
                eventData);
            return req.CreateResponse(HttpStatusCode.OK);
        }    
    }
}    