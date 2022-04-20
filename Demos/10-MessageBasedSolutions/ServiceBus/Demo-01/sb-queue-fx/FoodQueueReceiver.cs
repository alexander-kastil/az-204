using System;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;

namespace Integrations
{
    public static class FoodQueueReceiver
    {
        [FunctionName("FoodQueueReceiver")]
        public static void Run([ServiceBusTrigger("food-queue", Connection = "foodappdev_SERVICEBUS")]string myQueueItem, ILogger log)
        {
            log.LogInformation($"C# ServiceBus queue trigger function processed message: {myQueueItem}");
        }
    }
}
