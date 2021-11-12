using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Azure.Messaging.ServiceBus;

namespace SbApp
{
    public class Program
    {
        // connection string to your Service Bus namespace
        static string connectionString = "Endpoint=sb://sbdemosdev.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=K1X6hJCqaYuYtBYItO3fBZ2BdbU9DKBu/Dakvq9X4e8=";
 
        // name of your Service Bus topic
        static string topicName = "BasicTopic";

        // the client that owns the connection and can be used to create senders and receivers
        static ServiceBusClient? client;

        // the sender used to publish messages to the topic
        static ServiceBusSender? sender;

        // number of messages to be sent to the topic
        private const int numOfMessages = 3;

        public static ServiceBusClient? Client { get => client; set => client = value; }
        public static ServiceBusSender? Sender { get => sender; set => sender = value; }

        public static async Task Main(string[] args)
        {
            client = new ServiceBusClient(connectionString);
            Sender = client.CreateSender(topicName);

            using ServiceBusMessageBatch messageBatch = await Sender.CreateMessageBatchAsync();

            for (int i = 1; i <= numOfMessages; i++)
            {
                if (!messageBatch.TryAddMessage(new ServiceBusMessage($"Message {i}")))
                {
                    throw new Exception($"The message {i} is too large to fit in the batch.");
                }
            }

            try
            {
                await Sender.SendMessagesAsync(messageBatch);
                Console.WriteLine($"A batch of {numOfMessages} messages has been published to the topic.");
            }
            finally
            {
                await Sender.DisposeAsync();
                await client.DisposeAsync();
            }

            Console.WriteLine("Press any key to end the application");
            Console.ReadKey();
        }
    }
}
