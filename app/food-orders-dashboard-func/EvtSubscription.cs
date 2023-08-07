using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Microsoft.Azure.WebJobs.Extensions.SignalRService;
using System.Linq;

namespace Integrations
{
    public static class EvtSubscription
    {
        // Azure Function for handling negotation protocol for SignalR. It returns a connection info
        // that will be used by Client applications to connect to the SignalR service.
        // It is recommended to authenticate this Function in production environments.
        [FunctionName("negotiate")]
        public static SignalRConnectionInfo GetSignalRInfo(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post")] HttpRequest req,
            [SignalRConnectionInfo(HubName = "cloudEventSchemaHub")] SignalRConnectionInfo connectionInfo)
        {
            return connectionInfo;
        }

        // Handle EventGrid subscription validation for CloudEventSchema v1.0.
        // It sets the header response `Webhook-Allowed-Origin` with the value from 
        // the header request `Webhook-Request-Origin` 
        // (see: https://docs.microsoft.com/en-us/azure/event-grid/cloudevents-schema#use-with-azure-functions)
        [FunctionName("orderSubscription")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "options", "post", Route = null)] HttpRequest req,
            [SignalR(HubName = "cloudEventSchemaHub")] IAsyncCollector<SignalRMessage> signalRMessages,
            ILogger log)
        {
            if (HttpMethods.IsOptions(req.Method))
            {
                if(req.Headers.TryGetValue("Webhook-Request-Origin", out var headerValues))
                {
                    var originValue = headerValues.FirstOrDefault();
                    if(!string.IsNullOrEmpty(originValue))
                    {
                        req.HttpContext.Response.Headers.Add("Webhook-Allowed-Origin", originValue);
                        return new OkResult();
                    }

                    return new BadRequestObjectResult("Missing 'Webhook-Request-Origin' header when validating");
                }
            }
            
            // Handle an event received from EventGrid. It reads the event from the request payload and send 
            // it to the SignalR serverless service using the Azure Function output binding
            if(HttpMethods.IsPost(req.Method)) 
            {
                string @event = await new StreamReader(req.Body).ReadToEndAsync();
                await signalRMessages.AddAsync(new SignalRMessage
                {
                    Target = "foodapp.order",
                    Arguments = new[] { @event }
                });
            }

            return new OkResult();
        }
    }
}
