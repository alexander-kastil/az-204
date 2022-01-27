using System;
using Azure.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.AzureAppConfiguration;

namespace AppConfigConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            var builder = new ConfigurationBuilder();
            
            // Update Connection String
            var cs = "<App Config Service ConnectionString>";
            builder.AddAzureAppConfiguration(options =>
            {
                options.Connect(cs)
                        // Uncomment if you want to use a specific label
                        .Select(KeyFilter.Any, "prod") 
                        .ConfigureKeyVault(kv =>
                        {
                            kv.SetCredential(new DefaultAzureCredential());
                        });
            });

            var config = builder.Build();
            Console.WriteLine(config["Settings:Title"] ?? "No Title received");
            Console.WriteLine(config["Settings:ConnectionString"] ?? "No ConString received");
        }
    }
}
