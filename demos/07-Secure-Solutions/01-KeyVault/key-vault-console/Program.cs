using System;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;

namespace key_vault_console
{
    class Program
    {
        static async System.Threading.Tasks.Task Main(string[] args)
        {
            string keyVaultName = "foodvault-dev";
            string keyVaultUri = "https://" + keyVaultName + ".vault.azure.net";
            string secretName = "conSQLite";
            
            var client = new SecretClient(new Uri(keyVaultUri), new DefaultAzureCredential());
            KeyVaultSecret key = await client.GetSecretAsync(secretName);
            Console.WriteLine(key.Value);
        }
    }
}
