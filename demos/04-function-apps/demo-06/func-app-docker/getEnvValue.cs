using System.Net;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace Integrations
{
    public class getEnvValue
    {
        private readonly ILogger _logger;

        public getEnvValue(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<getEnvValue>();
        }

        [Function("getEnvValue")]
        public HttpResponseData Run([HttpTrigger(AuthorizationLevel.Anonymous, "get")] HttpRequestData req)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");

            var response = req.CreateResponse(HttpStatusCode.OK);
            response.Headers.Add("Content-Type", "text/plain; charset=utf-8");
            response.WriteString($"Welcome to Azure Functions! MyEnvVar has the following Value: {Environment.GetEnvironmentVariable("MyEnvVar")}");
            return response;
        }
    }
}
