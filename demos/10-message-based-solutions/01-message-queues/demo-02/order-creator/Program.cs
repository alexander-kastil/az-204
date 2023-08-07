using Azure.Storage.Queues;
using Microsoft.Extensions.Configuration;

var builder = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
IConfigurationRoot configuration = builder.Build();

var connectionString = configuration["storageAcctConStr"];
var q = configuration["queueName"];
QueueClient queue = new QueueClient(connectionString, q);

for (int i = 0; i < 1500; i++)
{
    var value = "Hello World - round " + i.ToString();
    await InsertMessageAsync(queue, value);
    Console.WriteLine($"Sent: {value}");
}

static async Task InsertMessageAsync(QueueClient q, string msg)
{
    if (null != await q.CreateIfNotExistsAsync())
    {
        Console.WriteLine("The queue was created.");
    }

    await q.SendMessageAsync(msg);
}