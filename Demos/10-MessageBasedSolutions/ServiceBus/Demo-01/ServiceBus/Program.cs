using System;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Azure.ServiceBus;

namespace ServiceBus {
    class Program {
        const string ServiceBusConnectionString = "Endpoint=sb://sbdemons11310.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=DQqGMOxfz8vt6odF/oCTCv/wbcO6lTeyB9HJnMmnMio=";
        const string QueueName = "sbqueue";
        static IQueueClient queueClient;

        public static async Task Main (string[] args) {
            const int numberOfMessages = 10;
            queueClient = new QueueClient (ServiceBusConnectionString, QueueName);

            // Send messages.
            await SendMessagesAsync (numberOfMessages);

            await queueClient.CloseAsync ();

            Console.ReadLine();
        }

        static async Task SendMessagesAsync (int numberOfMessagesToSend) {
            try {
                for (var i = 0; i < numberOfMessagesToSend; i++) {
                    // Create a new message to send to the queue.
                    string messageBody = $"Message {i}";
                    var message = new Message (Encoding.UTF8.GetBytes (messageBody));

                    // Write the body of the message to the console.
                    Console.WriteLine ($"Sending message: {messageBody}");

                    // Send the message to the queue.
                    await queueClient.SendAsync (message);
                }
            } catch (Exception exception) {
                Console.WriteLine ($"{DateTime.Now} :: Exception: {exception.Message}");
            }
        }
    }
}