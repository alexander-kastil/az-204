using System;
using System.Text;
using System.Threading.Tasks;
using Azure.Messaging.EventHubs;
using Azure.Messaging.EventHubs.Producer;

namespace SendEvents {
   class Program {
        private const string eventHubName = "evthub-21940";
        private const string connectionString = "Endpoint=sb://evthubns-21940.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=4sBlIfpuhTWbo4o77bHPm41O5HpG+FjJN+AEhF8IBxk=";

        static async Task Main () {
            // Create a producer client that you can use to send events to an event hub
            await using (var producerClient = new EventHubProducerClient (connectionString, eventHubName)) {
                // Create a batch of events 
                using EventDataBatch eventBatch = await producerClient.CreateBatchAsync ();

                // Add events to the batch. An event is a represented by a collection of bytes and metadata. 
                eventBatch.TryAdd (new EventData (Encoding.UTF8.GetBytes ("First event")));
                eventBatch.TryAdd (new EventData (Encoding.UTF8.GetBytes ("Second event")));
                eventBatch.TryAdd (new EventData (Encoding.UTF8.GetBytes ("Third event")));

                // Use the producer client to send the batch of events to the event hub
                await producerClient.SendAsync (eventBatch);
                Console.WriteLine ("A batch of 3 events has been published.");
            }
        }
    }
}