using System.Threading.Tasks;
using Azure.Messaging.ServiceBus;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SBConsole
{
    public class Program
    {
        static string connectionString = "<connection-string>";
        static string topic = "console-topic";
        static string subs = "console-topic-subs";

        // the client that owns the connection and can be used to create senders and receivers
        static ServiceBusClient? client;

        // the processor that reads and processes messages from the subscription
        static ServiceBusProcessor? processor;

        static async Task Main()
        {
            client = new ServiceBusClient(connectionString);
            processor = client.CreateProcessor(topic, subs, new ServiceBusProcessorOptions());

            try
            {
                processor.ProcessMessageAsync += MessageHandler;
                processor.ProcessErrorAsync += ErrorHandler;

                await processor.StartProcessingAsync();

                Console.WriteLine("Wait for a minute and then press any key to end the processing");
                Console.ReadKey();

                Console.WriteLine("\nStopping the receiver...");
                await processor.StopProcessingAsync();
                Console.WriteLine("Stopped receiving messages");
            }
            finally
            {
                await processor.DisposeAsync();
                await client.DisposeAsync();
            }
        }

        static async Task MessageHandler(ProcessMessageEventArgs args)
        {
            string body = args.Message.Body.ToString();
            Console.WriteLine($"Received: {body} from subscription: {subs}");
            await args.CompleteMessageAsync(args.Message);
        }

        static Task ErrorHandler(ProcessErrorEventArgs args)
        {
            Console.WriteLine(args.Exception.ToString());
            return Task.CompletedTask;
        }
    }
}