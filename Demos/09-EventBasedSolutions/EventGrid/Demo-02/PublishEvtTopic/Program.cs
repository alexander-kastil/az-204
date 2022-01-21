using System;
using System.Collections.Generic;
using Microsoft.Azure.EventGrid;
using Microsoft.Azure.EventGrid.Models;
using Newtonsoft.Json;

namespace FoodApp
{
    class Program
    {
        static void Main(string[] args)
        {
            var topic = "foodorder-topic-30596";
            var region = "westeurope";

            // TODO: Enter value for topic-key from create script
            string topicKey = "DW3+gYjepKG+PFOhpgEMDbYr1167IKYt9l4iwrjBdrs=";
            string topicEndpoint = $"https://{topic}.{region}-1.eventgrid.azure.net/api/events";
            string topicHostname = new Uri (topicEndpoint).Host;

            TopicCredentials topicCredentials = new TopicCredentials (topicKey);
            EventGridClient client = new EventGridClient (topicCredentials);
            var evts = GetEventsList ();
            client.PublishEventsAsync (topicHostname, evts).GetAwaiter ().GetResult ();
            Console.Write ("Published events to Event Grid topic.");
        }

        static IList<EventGridEvent> GetEventsList () {
            List<EventGridEvent> eventsList = new List<EventGridEvent> ();

            for (int i = 0; i < 20; i++) {
                eventsList.Add (new EventGridEvent () {
                    Id = Guid.NewGuid ().ToString (),
                        EventType = "FoodApp.Orders.OrderDelivered",
                        Data = new OrderDeliveredEventData () {
                            OrderNumber = i.ToString()
                        },
                        EventTime = DateTime.Now,
                        Subject = "Delivery of Order Complete",
                        DataVersion = "2.0"
                });
            }

            return eventsList;
        }
    }    
}
