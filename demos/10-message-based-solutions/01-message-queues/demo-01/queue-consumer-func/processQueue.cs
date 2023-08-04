using System;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace Company.Function
{
    public class processQueue
    {
        private readonly ILogger _logger;

        public processQueue(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<processQueue>();
        }

        [Function("processQueue")]
        public void Run([QueueTrigger("orders", Connection = "msgqueue22493_STORAGE")] string myQueueItem)
        {
            _logger.LogInformation($"C# Queue trigger function processed: {myQueueItem}");
        }
    }
}
