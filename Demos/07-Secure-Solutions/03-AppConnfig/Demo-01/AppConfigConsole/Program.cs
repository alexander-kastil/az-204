using System;
using Azure.Identity;
using Microsoft.Extensions.Configuration;

namespace AppConfigConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            var builder = new ConfigurationBuilder();
            var cs = "Endpoint=https://foodconfig-014.azconfig.io;Id=CmbS-l9-s0:WO2JsvkyX1ls499JMlOg;Secret=jCi77pbz+HXGKg15iEsoKpFFiki9HJWD0OQgf54nb6Q=";

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
                Console.WriteLine(config["Settings:ConnectionString"] ?? "No ConString received");
        }
    }
}