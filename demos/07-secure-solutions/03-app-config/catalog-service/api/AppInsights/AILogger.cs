using System;
using System.Collections.Generic;
using Microsoft.ApplicationInsights;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace FoodApp
{
    public class AILogger(TelemetryClient ai, IConfiguration cfg)
    {
        private string title = cfg.GetValue<string>("title");

        public void LogEvent(string text, object item, bool logToConsole = false)
        {
            string value = JsonConvert.SerializeObject(item);
            ai.TrackEvent($"{title} - {text}", new Dictionary<string, string> { { text, value } });
            if (logToConsole) Console.WriteLine($"{title} - {text} - {value}");
        }

        public void LogEvent(string text, string param)
        {
            var props = new Dictionary<string, string> { { text, param } };
            ai.TrackEvent(text, props);
        }

        public void LogEvent(string text, Exception ex)
        {
            ai.TrackEvent(text, new Dictionary<string, string> { { "Error", ex.Message } });
        }

        public void LogEvent(string text, Dictionary<string, string> arr)
        {
            ai.TrackEvent(text, arr);
        }

    }
}