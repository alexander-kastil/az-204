using System;
using System.Text.Json;
using System.Threading;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;
using QueueApp;

namespace Company.Function
{
    public class processQueue
    {
        [FunctionName("processQueue")]
        public void Run([QueueTrigger("orders", Connection = "msgqueue654_STORAGE")]string orderItemJson, ILogger log)
        {
            log.LogInformation($"C# Queue trigger function processed: {orderItemJson}");
            OrderItem orderItem = JsonSerializer.Deserialize<OrderItem>(orderItemJson);
            log.LogInformation($"C# Queue trigger function deserialized: {orderItem.Product}");
            Thread.Sleep(50);
        }
    }
}
