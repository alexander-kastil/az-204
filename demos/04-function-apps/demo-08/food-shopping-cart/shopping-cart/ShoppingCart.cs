using System.Linq;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.DurableTask;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using System;

namespace FoodApp
{
    public static class ShoppingCartOrchestration
    {
        [FunctionName("ShoppingCartStarter")]
        public static async Task<HttpResponseMessage> HttpStart(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "cart/init")] HttpRequestMessage req,
            [DurableClient] IDurableOrchestrationClient starter,
            ILogger log)
        {
            var order = await req.Content.ReadAsAsync<CartMetadata>();
            // log.LogInformation($"Received new cart data: '{order}'.");
            string instanceId = await starter.StartNewAsync("ShoppingCartOrchestration", order);
            log.LogInformation($"Started cart orchestration with ID = '{instanceId}'.");
            return starter.CreateCheckStatusResponse(req, instanceId);
        }

        [FunctionName("ShoppingCartOrchestration")]
        public static async Task<CartMetadata> RunOrchestrator(
            [OrchestrationTrigger] IDurableOrchestrationContext context,
            ILogger log)
        {
            CartMetadata cart = context.GetInput<CartMetadata>();

            //define activities and get current activity
            var addToCart = context.WaitForExternalEvent<OrderItem>("AddToCart");
            var removeFromCart = context.WaitForExternalEvent<OrderRemoveModel>("RemovFromCart");
            var checkoutCart = context.WaitForExternalEvent<CheckoutCartModel>("CheckoutCart");
            
            var evt = await Task.WhenAny(addToCart, removeFromCart, checkoutCart);

            //handle activities
            if (evt == addToCart)
            {
                var exists = cart.Items.FirstOrDefault(f => f.Id == addToCart.Result.Id);
                if (exists != null)
                {
                    exists.Quantity += addToCart.Result.Quantity;
                    log.LogInformation($"Food {addToCart.Result.Name} already exists in foodlist updating quantity");
                }
                else
                {
                    cart.Items.Add(addToCart.Result);
                    log.LogInformation($"Added food {addToCart.Result.Name} to foodlist");
                }
            }
            
            if (evt == removeFromCart)
            {
                var idx = Array.FindIndex(cart.Items.ToArray(), f => f.Id == removeFromCart.Result.Id);
                cart.Items.RemoveAt(idx);
            }
            
            if (evt == checkoutCart )
            {
                log.LogInformation($"Foodlist orchestration completed");
                return cart;
            }
            else
            {
                context.ContinueAsNew(cart);
            }

            return cart;
        }
    }
}