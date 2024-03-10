using System;
using System.Collections.Generic;
using Azure.Identity;
using Microsoft.Graph;

namespace FoodApp.MailDaemon
{
    public class GraphHelper
    {
        public static void SendMail(string Subject, string Message, string[] Recipient, GraphCfg config)
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
            SendMailUsingGraph(config, message);            
        }       
        private static void SendMailUsingGraph(GraphCfg config, Message msg)
        {
            //Get Graph Client
            var graphOptions = new ClientSecretCredentialOptions
            {
                AuthorityHost = AzureAuthorityHosts.AzurePublicCloud,
            };  
            var clientSecretCredential = new ClientSecretCredential(config.TenantId, config.ClientId, config.ClientSecret, graphOptions);
            var graphClient = new GraphServiceClient(clientSecretCredential);
            
            //Send mail
            //POST /users/{id | userPrincipalName}/sendMail
            graphClient.Users[config.MailSender].SendMail(msg, false).Request().PostAsync();                        
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