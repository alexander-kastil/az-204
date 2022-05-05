using Azure.Messaging.ServiceBus;
using FoodApp.OrderService;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace FoodApp.Common
{
    public class ServiceBusProxy
    {
        static string connectionString = "";
        static string topic = "";

        public ServiceBusProxy(string ConnectionString, string Topic)
        {
            connectionString = ConnectionString;
            topic = Topic;
        }
        public async void AddEvent(IntegrationEvent evt)        
        {
            ServiceBusClient client = new ServiceBusClient(connectionString);
            ServiceBusSender Sender = client.CreateSender(topic);

            using ServiceBusMessageBatch messageBatch = await Sender.CreateMessageBatchAsync();
            if (!messageBatch.TryAddMessage(new ServiceBusMessage(JsonSerializer.Serialize(evt))))
            {
                throw new Exception($"The message is too large to fit in the batch.");
            }
            await Sender.SendMessagesAsync(messageBatch);
        }

        public delegate Task MessageHandler(ProcessMessageEventArgs args);

        public async void Subscribe(MessageHandler handler){

            ServiceBusClient client = new ServiceBusClient(connectionString);
            ServiceBusProcessor processor = client.CreateProcessor(topic);

            processor.ProcessMessageAsync += handler;
        }
    }
}