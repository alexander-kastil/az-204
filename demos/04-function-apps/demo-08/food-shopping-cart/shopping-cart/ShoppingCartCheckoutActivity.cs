using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.DurableTask;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;

namespace FoodApp
{
    public static class ShoppingCartCheckoutActivity
    {
        [FunctionName(nameof(ShoppingCartCheckoutActivity))]
        public static async Task<HttpResponseMessage> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "cart/complete")] HttpRequestMessage req,
            [DurableClient] IDurableOrchestrationClient orchclient,
            ILogger logger)
        {

            var eventData = await req.Content.ReadAsAsync<CheckoutCartModel>();
            await orchclient.RaiseEventAsync(
                eventData.OrchestrationInstanceId,
                "CheckoutCart",
                eventData);

            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
