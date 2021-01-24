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
            var cs = "Endpoint=https://foodconfig-17830.azconfig.io;Id=pZrv-l9-s0:0Z1KF7t7l8O1N1T8G+KD;Secret=8fizNeNX5IbFzx4A4md6IdDG/Nj6RFOTrDk9vhz72Jc=";

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