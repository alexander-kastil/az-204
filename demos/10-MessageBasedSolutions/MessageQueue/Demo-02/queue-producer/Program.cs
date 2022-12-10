using System;
using System.IO;
using System.Threading.Tasks;
using Azure.Storage.Queues;
using Azure.Storage.Queues.Models;
using Microsoft.Extensions.Configuration;

namespace QueueApp
{
    class Program
    {
        static async Task Main(string[] args)
        {
            var builder = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            IConfigurationRoot configuration = builder.Build();
            var connectionString = configuration["msgqConStr"];
            var q = configuration["queueName"];
            QueueClient queue = new QueueClient(connectionString, q);
            
            for (int i = 0; i < 500; i++)
            {
                var value = "${'id': " + i + ", 'name': 'name" + i + "'}";
                await InsertMessageAsync(queue, value);
                System.Threading.Thread.Sleep(10);
                Console.WriteLine($"Sent: {value}");
            }
        }

        static async Task InsertMessageAsync(QueueClient q, string msg)
        {
            if (null != await q.CreateIfNotExistsAsync())
            {
                Console.WriteLine("The queue was created.");
            }

            await q.SendMessageAsync(msg);
        }

        // static async Task<string> RetrieveNextMessageAsync(QueueClient q)
        // {
        //     if (await q.ExistsAsync())
        //     {
        //         QueueProperties properties = await q.GetPropertiesAsync();

        //         if (properties.ApproximateMessagesCount > 0)
        //         {
        //             QueueMessage[] retrievedMessage = await q.ReceiveMessagesAsync(1);
        //             string theMessage = retrievedMessage[0].MessageText;
        //             await q.DeleteMessageAsync(retrievedMessage[0].MessageId, retrievedMessage[0].PopReceipt);
        //             return theMessage;
        //         }
        //         else
        //         {
        //             Console.Write("The queue is empty. Attempt to delete it? (Y/N) ");
        //             string response = Console.ReadLine();

        //             if (response.ToUpper() == "Y")
        //             {
        //                 await q.DeleteIfExistsAsync();
        //                 return "The queue was deleted.";
        //             }
        //             else
        //             {
        //                 return "The queue was not deleted.";
        //             }
        //         }
        //     }
        //     else
        //     {
        //         return "The queue does not exist. Add a message to the command line to create the queue and store the message.";
        //     }
        // }
    }
}