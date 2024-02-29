using System;
using System.Collections.Generic;
using Microsoft.ApplicationInsights;
using Microsoft.Extensions.Configuration;

namespace FoodApp
{
    public class AILogger
    {
        private TelemetryClient ai;
        private AppConfig config;

        public AILogger(TelemetryClient tc, IConfiguration cfg)
        {
            ai = tc;
            config = cfg.Get<AppConfig>();
        }
        
        public void LogEvent(string text, object item, bool logToConsole = false)
        {
            string value = Newtonsoft.Json.JsonConvert.SerializeObject(item);
            ai.TrackEvent($"Dev - {text}", new Dictionary<string, string> { { text, value } });
            if (logToConsole) Console.WriteLine($"Dev - {text} - {value}");
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