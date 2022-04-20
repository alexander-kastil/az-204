using System;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Azure.ServiceBus;

namespace ServiceBus {
    class Program {
        const string conSB = "Endpoint=sb://foodappdev.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=txqwKdActAoXwS+bY/FVl10W8LRqwMdZykIDezWiD44=";
        const string queue = "food-queue";
        static IQueueClient queueClient;

        public static async Task Main (string[] args) {
            const int numberOfMessages = 10;
            queueClient = new QueueClient (conSB, queue);
            await SendMessagesAsync (numberOfMessages);
            await queueClient.CloseAsync ();
            Console.WriteLine ("Sending completed");            
        }

        static async Task SendMessagesAsync (int numberOfMessagesToSend) {
            try {
                for (var i = 0; i < numberOfMessagesToSend; i++) {
                    string msg = $"Food Message {i}";
                    var message = new Message (Encoding.UTF8.GetBytes (msg));
                    Console.WriteLine ($"Sending message: {msg}");
                    await queueClient.SendAsync (message);
                }
            } catch (Exception exception) {
                Console.WriteLine ($"{DateTime.Now} :: Exception: {exception.Message}");
            }
        }
    }
}