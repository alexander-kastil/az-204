using System;
using System.Globalization;
using System.Threading.Tasks;
using System.Text.Json;
using Newtonsoft.Json;

namespace FoodApi
{
    public class CloudEvent<T> where T : class
    {
        public CloudEvent(T item){
            specversion = "1.0";
            type = "FoodApp." + this.GetType().ToString();
            source = "FoodApi";
            time = DateTime.UtcNow;
            dataschema = "#";
            Data = item;
        }

        [JsonProperty("specversion")]
        public string specversion { get; set; }
        [JsonProperty("type")]
        public string type { get; set; }
        [JsonProperty("source")]
        public string source { get; set; }
        [JsonProperty("id")]
        public string id { get; set; }
        [JsonProperty("time")]
        public DateTime time { get; set; }
        [JsonProperty("subject")]
        public string subject { get; set; }
        [JsonProperty("dataschema")]
        public string dataschema { get; set; }
        [JsonProperty("data")]
        public T Data { get; set; }
    }

    // public class CloudEvent<T> where T : class
    // {
    //     [JsonProperty("eventID")]
    //     public string EventId { get; set; }

    //     [JsonProperty("cloudEventsVersion")]
    //     public string CloudEventVersion { get; set; }

    //     [JsonProperty("eventType")]
    //     public string EventType { get; set; }

    //     [JsonProperty("eventTypeVersion")]
    //     public string EventTypeVersion { get; set; }

    //     [JsonProperty("source")]
    //     public string Source { get; set; }

    //     [JsonProperty("eventTime")]
    //     public string EventTime { get; set; }

    //     [JsonProperty("data")]
    //     public T Data { get; set; }
    // }
}