using System;
using System.IO;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Azure.Storage.Queues;
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

            for (int i = 0; i < 10; i++)
            {
                var item = new OrderItem { Id = i, Product = "Product " + i, Quantity = i };
                await InsertMessageAsync(queue, item);
                System.Threading.Thread.Sleep(10);
            }
        }

        static async Task InsertMessageAsync(QueueClient q, OrderItem item)
        {
            if (null != await q.CreateIfNotExistsAsync())
            {
                Console.WriteLine("The queue was created.");
            }

            // QueueTrigger expects a base64 encoded string
            var msg = Convert.ToBase64String(Encoding.UTF8.GetBytes(JsonSerializer.Serialize(item)));
            await q.SendMessageAsync(msg);
            Console.WriteLine($"Sent: {item.Product}");
        }
    }
}