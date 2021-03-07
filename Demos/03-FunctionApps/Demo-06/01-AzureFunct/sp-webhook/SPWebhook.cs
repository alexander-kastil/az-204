using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace Integrations
{
    public static class SPWebhook
    {
        [FunctionName("SPWebhook")]
        public static async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,  ILogger log)
        {
            log.LogInformation($"Webhook was triggered!");

            // Grab the validationToken URL parameter
            string validationToken = req.Query["validationtoken"];

            // If a validation token is present, we need to respond within 5 seconds by
            // returning the given validation token. This only happens when a new
            // webhook is being added
            if (validationToken != null)
            {
                log.LogInformation($"Validation token {validationToken} received");
                return (ActionResult)new OkObjectResult(validationToken);
            }

            log.LogInformation($"SharePoint triggered our webhook...great :-)");
            var content = await new StreamReader(req.Body).ReadToEndAsync();
            log.LogInformation($"Received following payload: {content}");

            var notifications = JsonConvert.DeserializeObject<ResponseModel<NotificationModel>>(content).Value;
            log.LogInformation($"Found {notifications.Count} notifications");

            if (notifications.Count > 0)
            {
                log.LogInformation($"Processing notifications...");
                foreach(var notification in notifications)
                {
                    string message = JsonConvert.SerializeObject(notification);
                    log.LogInformation($"Received msg from sp-webhook. Message content: {message}");
                }
            }

            // if we get here we assume the request was well received
            return (ActionResult)new OkObjectResult($"Added to queue");
        }

        // supporting classes
        public class ResponseModel<T>
        {
        [JsonProperty(PropertyName = "value")]
        public List<T> Value { get; set; }
        }

        public class NotificationModel
        {
        [JsonProperty(PropertyName = "subscriptionId")]
        public string SubscriptionId { get; set; }

        [JsonProperty(PropertyName = "clientState")]
        public string ClientState { get; set; }

        [JsonProperty(PropertyName = "expirationDateTime")]
        public DateTime ExpirationDateTime { get; set; }

        [JsonProperty(PropertyName = "resource")]
        public string Resource { get; set; }

        [JsonProperty(PropertyName = "tenantId")]
        public string TenantId { get; set; }

        [JsonProperty(PropertyName = "siteUrl")]
        public string SiteUrl { get; set; }

        [JsonProperty(PropertyName = "webId")]
        public string WebId { get; set; }
        }

        public class SubscriptionModel
        {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "clientState", NullValueHandling = NullValueHandling.Ignore)]
        public string ClientState { get; set; }

        [JsonProperty(PropertyName = "expirationDateTime")]
        public DateTime ExpirationDateTime { get; set; }

        [JsonProperty(PropertyName = "notificationUrl")]
        public string NotificationUrl {get;set;}

        [JsonProperty(PropertyName = "resource", NullValueHandling = NullValueHandling.Ignore)]
        public string Resource { get; set; }
        }
    }
}