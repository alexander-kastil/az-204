using System;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Azure.Messaging.ServiceBus;

namespace ServiceBus
{
    class Program
    {
        const string conSB = "Endpoint=sb://foodappdev.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=txqwKdActAoXwS+bY/FVl10W8LRqwMdZykIDezWiD44=";
        const string queue = "food-queue";
        static ServiceBusClient client;

        public static async Task Main(string[] args)
        {
            const int msgs = 10;
            client = new ServiceBusClient(conSB);
            var sender = client.CreateSender(queue);

            using ServiceBusMessageBatch messageBatch = await sender.CreateMessageBatchAsync();

            for (int i = 1; i <= msgs; i++)
            {
                if (!messageBatch.TryAddMessage(new ServiceBusMessage($"Message {i}")))
                {
                    throw new Exception($"The message {i} is too large to fit in the batch.");
                }
            }

            try
            {
                await sender.SendMessagesAsync(messageBatch);
                Console.WriteLine($"A batch of {msgs} messages has been published to the queue.");
            }
            finally
            {
                await sender.DisposeAsync();
                await client.DisposeAsync();
            }

            Console.WriteLine("Sending completed");
        }
    }
}