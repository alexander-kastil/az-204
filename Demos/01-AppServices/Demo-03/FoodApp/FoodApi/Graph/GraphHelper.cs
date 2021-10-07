using System;
using System.Collections.Generic;
using Microsoft.Graph;
using Microsoft.Graph.Auth;
using Microsoft.Identity.Client;

namespace FoodApp
{
    public class GraphHelper
    {
        public static bool SendMail(string Subject, string Message, string[] Recipient, FoodConfig config)
        {
            var result = false;
            var recipients = new List<Recipient>();

            foreach (var r in Recipient)
            {
                AddReciepient(recipients, r);
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

            send(config, message);
            
            result = true;
            return result;
        }

        private static void send(FoodConfig cfg, Message msg)
        {
            IConfidentialClientApplication confidentialClientApplication = ConfidentialClientApplicationBuilder
                .Create(cfg.AppReg.clientId)
                .WithTenantId(cfg.AppReg.tenantId)
                .WithClientSecret(cfg.AppReg.clientSecret)
                .Build();

            ClientCredentialProvider authProvider = new ClientCredentialProvider(confidentialClientApplication);

            GraphServiceClient graphClient = new GraphServiceClient(authProvider);
            graphClient.Users[cfg.App.mailSender].SendMail(msg, false).Request().PostAsync();
            List<QueryOption> options = new List<QueryOption> {
                    new QueryOption ("$top", "1")
                };

            var graphResult = graphClient.Users.Request(options).GetAsync().Result;
        }

        private static void AddReciepient(List<Recipient> toRecipientsList, string r)
        {
            var emailAddress = new Microsoft.Graph.EmailAddress
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