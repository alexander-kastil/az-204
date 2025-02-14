using System;
using Azure.Messaging.EventHubs;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace Integrations
{
    public class GraphProcessor
    {
        private readonly ILogger<GraphProcessor> _logger;

        public GraphProcessor(ILogger<GraphProcessor> logger)
        {
            _logger = logger;
        }

        [Function(nameof(GraphProcessor))]
        public void Run([EventHubTrigger("graphevents-hub-927", Connection = "EventHubConnection")] EventData[] events)
        {
            foreach (EventData @event in events)
            {
                _logger.LogInformation("Event Body: {body}", @event.Body);

                string data = System.Text.Encoding.UTF8.GetString(@event.Body.ToArray());
                _logger.LogInformation("Event Data: {data}", data);
            }
        }
    }
}
