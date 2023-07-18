using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.DurableTask;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;

namespace FoodApp
{
    public static class ShoppingCartRemoveActivity
    {
        [FunctionName(nameof(ShoppingCartRemoveActivity))]
        public static async Task<HttpResponseMessage> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "cart/remove")] HttpRequestMessage req,
            [DurableClient] IDurableOrchestrationClient orchclient,
            ILogger logger)
        {
            
            var eventData = await req.Content.ReadAsAsync<OrderRemoveModel>();
            string eventName = "RemoveFood";
            await orchclient.RaiseEventAsync(
                eventData.OrchestrationInstanceId,
                eventName,
                eventData);
            return new HttpResponseMessage(HttpStatusCode.OK);
        }    
    }
}    