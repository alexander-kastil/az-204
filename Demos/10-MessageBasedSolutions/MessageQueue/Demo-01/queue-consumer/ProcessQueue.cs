using System;
using System.Threading;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;

namespace Company.Function
{
    public class ProcessQueue
    {
        [FunctionName("ProcessQueue")]
        public void Run([QueueTrigger("az-204-queue", Connection = "msgqueue14315_STORAGE")]string myQueueItem, ILogger log)
        {
            Thread.Sleep(1000);
            log.LogInformation($"C# Queue trigger function processed: {myQueueItem}");
        }
    }
}
