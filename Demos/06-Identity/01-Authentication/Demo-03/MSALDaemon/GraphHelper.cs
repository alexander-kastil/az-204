using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.Graph;
using Microsoft.Graph.Auth;
using Microsoft.Identity.Client;

namespace MSALDaemon
{
    public class GraphHelper
    {

        private static void sendMail(GraphCfg gconfig, Message msg, string SenderAcct)
        {
            IConfidentialClientApplication confidentialClientApplication = ConfidentialClientApplicationBuilder
                .Create(gconfig.clientId)
                .WithTenantId(gconfig.tenantId)
                .WithClientSecret(gconfig.clientSecret)
                .Build();

            ClientCredentialProvider authProvider = new ClientCredentialProvider(confidentialClientApplication);

            GraphServiceClient graphClient = new GraphServiceClient(authProvider);
            graphClient.Users[SenderAcct].SendMail(msg, false).Request().PostAsync();
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

        public static bool Send(string Subject, string Message, string[] Recipient, GraphCfg config)
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

            config.returnUrl = config.frontendUrl;
            sendMail(config, message, config.mailSender);

            result = true;
            return result;
        }
    }
}