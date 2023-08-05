using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Integrations
{
    public static class ExecutePayment
    {
        [FunctionName("executePayment")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            Guid transactionId = data?.transactionId;
            
            log.LogInformation($"Executing payment for transaction: {transactionId}");
            Util.CheckThrottle();

            string result = "{'trainsactionID': '" + transactionId +" ','status': 'completed'}";

            return new OkObjectResult(result);
        }
    }
}
