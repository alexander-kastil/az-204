using System;
using System.Collections.Generic;
using Microsoft.ApplicationInsights;

namespace MSALDaemon
{
    public class AILogger
    {
        private TelemetryClient ai;

        public AILogger(TelemetryClient tc)
        {
            ai = tc;
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