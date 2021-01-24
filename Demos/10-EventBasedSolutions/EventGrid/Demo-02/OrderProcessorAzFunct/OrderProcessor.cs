// Default URL for triggering event grid function in the local environment.
// http://localhost:7071/runtime/webhooks/EventGrid?functionName={functionname}
using System;
using Microsoft.Azure.EventGrid.Models;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.EventGrid;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;

namespace Company.Function {
    public static class OrderProcessor {
        [FunctionName ("OrderProcessor")]
        public static void Run ([EventGridTrigger] EventGridEvent eventGridEvent, ILogger log) {
            log.LogInformation (eventGridEvent.Data.ToString ());

        }
    }
}