using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Azure.Identity;
using Microsoft.Graph;
using Microsoft.Graph.Models;

namespace FoodApp.MailDaemon
{
    public class GraphHelper
    {
        public static async Task SendMail(string Subject, string Message, string[] Recipient, GraphCfg config)
        {
            var recipients = new List<Recipient>();

            foreach (var r in Recipient)
            {
                AddRecipient(recipients, r);
            }

            var body = new ItemBody
            {
                ContentType = BodyType.Html,
                Content = Message,
            };

            Message message = new Message
            {
                Subject = Subject,
                Body = body,
                ToRecipients = recipients,
            };
            await SendMailUsingGraphAsync(config, message);
        }
        private static async Task SendMailUsingGraphAsync(GraphCfg config, Message msg)
        {
            //Get Graph Client
            var credentials = new ClientSecretCredential(
                    config.TenantId,
                    config.ClientId,
                    config.ClientSecret
                );

            GraphServiceClient graphClient = new GraphServiceClient(credentials, new[] { "https://graph.microsoft.com/.default" });

            //Send mail
            //POST /users/{id | userPrincipalName}/sendMail
            var requestBody = new Microsoft.Graph.Users.Item.SendMail.SendMailPostRequestBody
            {
                Message = msg,
                SaveToSentItems = false
            };
            await graphClient.Users[config.MailSender].SendMail.PostAsync(requestBody);
        }

        private static void AddRecipient(List<Recipient> toRecipientsList, string r)
        {
            var emailAddress = new EmailAddress
            {
                Address = r,
            };

            var toRecipients = new Recipient
            {
                EmailAddress = emailAddress,
            };
            toRecipientsList.Add(toRecipients);
        }
    }
}