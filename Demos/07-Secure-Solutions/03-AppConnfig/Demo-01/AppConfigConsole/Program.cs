using System;
using Azure.Identity;
using Microsoft.Extensions.Configuration;

namespace AppConfigConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            var permissions = true;
            var builder = new ConfigurationBuilder();
            var cs = "Endpoint=https://foodconfig-31949.azconfig.io;Id=cmao-l9-s0:vdUbard9SZn5qXw6AJeq;Secret=BHhkZz4eGIAlRcv5xRrRt8dnTLkyWXNlNOp/5qJYI3M=";

            if (permissions)
            {
                builder.AddAzureAppConfiguration(cs);
                var config = builder.Build();
                var title = config["Settings:Title"];
                Console.WriteLine(title ?? "No Title received");
            }
            else
            {
                builder.AddAzureAppConfiguration(options =>
               {
                   options.Connect(cs)
                           .ConfigureKeyVault(kv =>
                           {
                               kv.SetCredential(new DefaultAzureCredential());
                           });
               });

                var config = builder.Build();
                Console.WriteLine(config["Settings:Title"] ?? "No Title received");
                Console.WriteLine(config["ConnectionString:SQL"] ?? "No ConString received");
            }
        }
    }
}