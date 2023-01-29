using System;
using System.Text.Json;
using System.Threading;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;
using QueueApp;

namespace Integrations
{
    public class ProcessOrders
    {
        [FunctionName("ProcessOrders")]
        public void Run([QueueTrigger("orders", Connection = "msgqueue29113_STORAGE")]string orderItemJson, ILogger log)
        {
            OrderItem orderItem = JsonSerializer.Deserialize<OrderItem>(orderItemJson);
            log.LogInformation($"C# Queue trigger function deserialized: {orderItem.Product}");
            Thread.Sleep(50);
        }
    }
}
 