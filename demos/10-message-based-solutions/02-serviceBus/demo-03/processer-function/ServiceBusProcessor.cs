using System;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;

namespace Integrations
{
    public class ServiceBusProcessor
    {
        private readonly ILogger<ServiceBusProcessor> _logger;

        public ServiceBusProcessor(ILogger<ServiceBusProcessor> log)
        {
            _logger = log;
        }

        [FunctionName("ServiceBusProcessor")]
        public void Run([ServiceBusTrigger("food-events", "console-topic-subs", Connection = "foodappdev_SERVICEBUS")]string mySbMsg)
        {
            _logger.LogInformation($"C# ServiceBus topic trigger function processed message: {mySbMsg}");
        }
    }
}
