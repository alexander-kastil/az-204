using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Microsoft.Azure.Services.AppAuthentication;
using Microsoft.Azure.KeyVault;
using Microsoft.Extensions.Configuration;


namespace Company.Function
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
                var kvUri = $"https://{kvName}.vault.azure.net/";

                log.LogInformation($"Obtaining secret {secret} from {kvUri}");

                var serviceTokenProvider = new AzureServiceTokenProvider();
                var keyVaultClient = new KeyVaultClient(new KeyVaultClient.AuthenticationCallback(serviceTokenProvider.KeyVaultTokenCallback));
                dbconstring = (keyVaultClient.GetSecretAsync(kvUri, secret).Result).Value;
            }

            string responseMessage = string.IsNullOrEmpty(secret)
                ? "Param Missing. Pass a secret name in the request body."
                : $"Value of {secret} is {dbconstring}.";

            return new OkObjectResult(responseMessage);
        }
    }
}
