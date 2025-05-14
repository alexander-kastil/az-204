using System;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace key_vault_console
{
    class Program
    {
        static async System.Threading.Tasks.Task Main(string[] args)
        {
            // Build configuration from appsettings.json
            IConfiguration configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .Build();

            // Read Key Vault settings from configuration
            string keyVaultName = configuration.GetValue<string>("KeyVault:Name");
            string secretName = configuration.GetValue<string>("KeyVault:SecretName");
            string keyVaultUri = $"https://{keyVaultName}.vault.azure.net";

            var client = new SecretClient(new Uri(keyVaultUri), new DefaultAzureCredential());
            KeyVaultSecret key = await client.GetSecretAsync(secretName);
            Console.WriteLine(key.Value);
        }
    }
}
