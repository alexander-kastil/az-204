using System;
using System.Collections.Generic;
using Microsoft.Graph;

namespace FoodApp.MailDeamon
{
    public class GraphHelper
    {
        public static GraphServiceClient GetAuthenticatedGraphClient(GraphCfg config)
        {
            var authenticationProvider = MsalAuthenticationProvider.CreateAuthorizationProvider(config.TenantId, config.ClientId, config.ClientSecret);
            return new GraphServiceClient(authenticationProvider);
        }

        public static bool SendMail(string Subject, string Message, string[] Recipient, GraphCfg config)
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
            SendMailUsingGraph(config, message);
            result = true;
            return result;
        }       
        private static void SendMailUsingGraph(GraphCfg gconfig, Message msg)
        {
            GraphServiceClient graphClient = GraphHelper.GetAuthenticatedGraphClient(gconfig);        
            //POST /users/{id | userPrincipalName}/sendMail
            graphClient.Users[gconfig.MailSender].SendMail(msg, false).Request().PostAsync();            
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