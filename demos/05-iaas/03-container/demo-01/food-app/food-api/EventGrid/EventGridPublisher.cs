using System;
using System.Collections.Generic;
using System.Globalization;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using FoodApp;
using Microsoft.Azure.EventGrid;
using Microsoft.Azure.EventGrid.Models;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace FoodApi
{
    public class EventGridPublisher
    {
        FoodConfig cfg;

        public EventGridPublisher(IConfiguration config)
        {
            cfg = config.Get<FoodConfig>();
        }

        public async void PublishEvent(FoodItem item, FoodEventType type)
        {
            var evtItem = new CloudEvent<FoodItem>(item);
            var client = new HttpClient { BaseAddress = new Uri(cfg.Azure.EventGridEP) };
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));            
            client.DefaultRequestHeaders.Add("aeg-sas-key", cfg.Azure.EventGridKey);
            var json = JsonConvert.SerializeObject(evtItem);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await client.PostAsync(string.Empty, content);

            //TODO: Update Event to use CloudEventV10 schema
            // EventGridEvent evt = new EventGridEvent()
            // {
            //     Id = Guid.NewGuid().ToString(),
            //     EventType = $"FoodApp.{type.ToString()}",
            //     Data = new FoodEventData()
            //     {
            //         id = item.ID,
            //         type = FoodEventType.Create.ToString(),
            //         quantity = 1
            //     },
            //     EventTime = DateTime.Now,
            //     Subject = "FoodEvent",
            //     DataVersion = "2.0"
            // };
            // List<CloudEvent<FoodItem>> events = new List<CloudEvent<FoodItem>> (){cloudEvent};

            // string topicHostname = new Uri(cfg.Azure.EventGridEP).Host;
            // TopicCredentials topicCredentials = new TopicCredentials(cfg.Azure.EventGridKey);
            // EventGridClient client = new EventGridClient(topicCredentials);
            // client.PublishEventsAsync (topicHostname, events).GetAwaiter ().GetResult ();
        }
    }
}