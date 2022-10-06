using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.Azure.EventGrid;
using Microsoft.Azure.EventGrid.Models;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace FoodApp
{
    class Program
    {
        static void Main(string[] args)
        {   
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            IConfigurationRoot configuration = builder.Build();
            
            var topic = configuration["topic"];
            var topicKey = configuration["topicKey"];

            var events = 20;
            var region = "westeurope";
            string topicEndpoint = $"https://{topic}.{region}-1.eventgrid.azure.net/api/events";
            string topicHostname = new Uri (topicEndpoint).Host;

            TopicCredentials topicCredentials = new TopicCredentials (topicKey);
            EventGridClient client = new EventGridClient (topicCredentials);
            var evts = generateEvents (events);
            client.PublishEventsAsync (topicHostname, evts).GetAwaiter ().GetResult ();
            
            Console.Write ($"Published {events} events to Event Grid topic.");
        }

        static IList<EventGridEvent> generateEvents (int evts) {
            List<EventGridEvent> eventsList = new List<EventGridEvent> ();

            for (int i = 0; i < evts; i++) {
                eventsList.Add (new EventGridEvent () {
                    Id = Guid.NewGuid ().ToString (),
                        EventType = "FoodApp.Orders.OrderDelivered",
                        Data = new FoodEventData () {
                            id = i,
                            type = FoodEventType.Create.ToString(),
                            quantity = 1

                        },
                        EventTime = DateTime.Now,
                        Subject = "Food Order Added",
                        DataVersion = "2.0"
                });
            }
            return eventsList;
        }
    }    
}
