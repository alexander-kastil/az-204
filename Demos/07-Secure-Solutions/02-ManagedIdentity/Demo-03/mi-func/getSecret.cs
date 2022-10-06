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

namespace Company.Function
{
    public static class getSecret
    {
        [FunctionName("getSecret")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            string secret = data?.secret;
            log.LogInformation($"Obtaining secret {secret}.");

            var serviceTokenProvider = new AzureServiceTokenProvider();

            var keyVaultClient = new KeyVaultClient(new KeyVaultClient.AuthenticationCallback(serviceTokenProvider.KeyVaultTokenCallback));

            // var secretUri = SecretUri(secretRequest.Secret);


            var val = "";

            string responseMessage = string.IsNullOrEmpty(val)
                ? "This HTTP triggered function executed successfully. Pass a secret name in the request body."
                : $"Value of {secret} is {val}.";

            return new OkObjectResult(responseMessage);
        }
    }
}
