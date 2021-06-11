using System;
using System.Threading.Tasks;
using Azure.Storage.Queues;
using Azure.Storage.Queues.Models;

namespace QueueApp {
    class Program {

        const string connectionString = "DefaultEndpointsProtocol=https;EndpointSuffix=core.windows.net;AccountName=msgqueue30925;AccountKey=hbg0bIpCnayj/H5PPsPNLURjYT0jzoOds7+8d14b+2ID3av6zgj41heHYbbhRypnSpUtHi/7CVrfK5pa+p8Wwg==";

        static async Task Main (string[] args) {

            QueueClient queue = new QueueClient(connectionString, "az-204-queue");

            //Insert msg
            var value = "My demo value";
            await InsertMessageAsync(queue, value);
            Console.WriteLine($"Sent: {value}");


            var result = await RetrieveNextMessageAsync(queue);
            Console.WriteLine($"Received: {result}");

            Console.Write("Press Enter...");
            Console.ReadLine();
        }

        static async Task InsertMessageAsync(QueueClient q, string msg)
        {
            if (null != await q.CreateIfNotExistsAsync())
            {
                Console.WriteLine("The queue was created.");
            }

            await q.SendMessageAsync(msg);
        }

        static async Task<string> RetrieveNextMessageAsync(QueueClient q)
        {
            if (await q.ExistsAsync())
            {
                QueueProperties properties = await q.GetPropertiesAsync();

                if (properties.ApproximateMessagesCount > 0)
                {
                    QueueMessage[] retrievedMessage = await q.ReceiveMessagesAsync(1);
                    string theMessage = retrievedMessage[0].MessageText;
                    await q.DeleteMessageAsync(retrievedMessage[0].MessageId, retrievedMessage[0].PopReceipt);
                    return theMessage;
                }
                else
                {
                    Console.Write("The queue is empty. Attempt to delete it? (Y/N) ");
                    string response = Console.ReadLine();

                    if (response.ToUpper() == "Y")
                    {
                        await q.DeleteIfExistsAsync();
                        return "The queue was deleted.";
                    }
                    else
                    {
                        return "The queue was not deleted.";
                    }
                }
            }
            else
            {
                return "The queue does not exist. Add a message to the command line to create the queue and store the message.";
            }
        }
    }
}