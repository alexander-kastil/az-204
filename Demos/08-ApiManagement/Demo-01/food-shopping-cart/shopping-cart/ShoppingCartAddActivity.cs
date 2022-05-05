using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.DurableTask;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;

namespace Integrations
{
    public static class ShoppingCartAddActivity
    {
        [FunctionName(nameof(ShoppingCartAddActivity))]
        public static async Task<HttpResponseMessage> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "foodcart/add")] HttpRequestMessage req,
            [DurableClient] IDurableOrchestrationClient orchclient,
            ILogger logger)
        {
            
            var eventData = await req.Content.ReadAsAsync<FoodModel>();
            string eventName = "AddFood";
            await orchclient.RaiseEventAsync(
                eventData.OrchestrationInstanceId,
                eventName,
                eventData);
            return req.CreateResponse(HttpStatusCode.OK);
        }    
    }
}    