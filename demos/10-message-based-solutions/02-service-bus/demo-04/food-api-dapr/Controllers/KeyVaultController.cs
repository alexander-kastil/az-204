using Azure.Core;
using Azure.Identity;
using Newtonsoft.Json.Linq;
using Dapr.Client;

using Microsoft.AspNetCore.Mvc;

namespace ConfigApi;

[ApiController]
[Route("[controller]")]
public class KeyVaultController : ControllerBase
{
    private readonly ILogger<KeyVaultController> logger;
    private IConfiguration cfg;
    private readonly DaprClient client;

    public KeyVaultController(ILogger<KeyVaultController> lgr, IConfiguration configuration, DaprClient daprClient)
    {
        logger = lgr;
        cfg = configuration;
        client = daprClient;
    }

    [HttpGet("getSecret")]
    public async Task<string> Get(string secretName)
    {
        HttpClient client = new HttpClient();
        var daprResponse = await client.GetAsync($"http://localhost:5010/v1.0/secrets/azurekeyvault/{secretName}");
        var secretJson = await daprResponse.Content.ReadAsStringAsync();
        return JObject.Parse(secretJson)[secretName].ToString();
    }
}