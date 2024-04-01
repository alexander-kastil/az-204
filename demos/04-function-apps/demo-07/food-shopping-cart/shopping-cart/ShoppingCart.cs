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
            var updateCart = context.WaitForExternalEvent<CartItem>("UpdateCart");
            var checkoutCart = context.WaitForExternalEvent<CheckoutCartModel>("CheckoutCart");

            var evt = await Task.WhenAny(updateCart, checkoutCart);

            //handle activities
            if (evt == updateCart)
            {
                if (updateCart.Result.Add)
                {
                    var exists = cart.Items.FirstOrDefault(f => f.Id == updateCart.Result.Id);
                    if (exists != null)
                    {
                        exists.Quantity += updateCart.Result.Quantity;
                        log.LogInformation($"Food {updateCart.Result.Name} already exists in foodlist adding items");
                    }
                    else
                    {
                        cart.Items.Add(updateCart.Result);
                        log.LogInformation($"Added food {updateCart.Result.Name} to foodlist");
                    }
                }
                else
                {
                    var exists = cart.Items.FirstOrDefault(i => i.Id == updateCart.Result.Id);
                    if (exists != null && exists.Quantity > updateCart.Result.Quantity)
                    {
                        exists.Quantity = exists.Quantity - updateCart.Result.Quantity;
                        log.LogInformation($"Food {updateCart.Result.Name} exists in foodlist reducing items");
                    }
                    else 
                    {
                        cart.Items.Remove(exists);
                        log.LogInformation($"Food {updateCart.Result.Name} will be removed from cart");
                    }
                }
            }
            if (evt == checkoutCart)
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