using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Microsoft.Extensions.Configuration;
using Azure.Security.KeyVault.Secrets;
using Azure.Identity;

namespace Integrations
{
    public static class getSecret
    {
        [FunctionName("getSecret")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequest req,
            ILogger log, ExecutionContext context)
        {
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            string secret = data?.secret;
            string dbconstring = "";

            if(string.IsNullOrEmpty(secret)==false){
                var config = new ConfigurationBuilder()
                .SetBasePath(context.FunctionAppDirectory)
                .AddJsonFile("local.settings.json", optional: true, reloadOnChange: true)
                .AddEnvironmentVariables()
                .Build();

                var kvName = config["KeyVaultName"];

                log.LogInformation($"Obtaining secret {secret} from {kvName}");

                var client = new SecretClient(new Uri($"https://{kvName}.vault.azure.net/"), new DefaultAzureCredential());
                var response = await client.GetSecretAsync("conSQLite");     
                dbconstring = response.Value.Value;
            }

            string responseMessage = string.IsNullOrEmpty(secret)
                ? "Param Missing. Pass a secret name in the request body."
                : $"Value of {secret} is {dbconstring}.";

            return new OkObjectResult(responseMessage);
        }
    }
}
