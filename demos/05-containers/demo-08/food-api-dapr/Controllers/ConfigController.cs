using Azure.Core;
using Azure.Identity;
using Newtonsoft.Json.Linq;
using Dapr.Client;

using Microsoft.AspNetCore.Mvc;

namespace ConfigApi;

[ApiController]
[Route("[controller]")]
public class ConfigController : ControllerBase
{
    private readonly ILogger<ConfigController> logger;
    private IConfiguration cfg;
    private readonly DaprClient client;

    public ConfigController(ILogger<ConfigController> lgr, IConfiguration configuration, DaprClient daprClient)
    {
        logger = lgr;
        cfg = configuration;
        client = daprClient;
    }

    [HttpGet("getKeyVaultSecret")]
    public async Task<ConfigResult> GetSecret(string secretName)
    {
        HttpClient client = new HttpClient();
        var daprResponse = await client.GetAsync($"http://localhost:5010/v1.0/secrets/azure-keyvault/{secretName}");
        if(daprResponse.IsSuccessStatusCode == false)
            throw new Exception(await daprResponse.Content.ReadAsStringAsync());

        var json = await daprResponse.Content.ReadAsStringAsync();
        return new ConfigResult { Name = secretName, Value = JObject.Parse(json)[secretName].ToString() };
    }

    [HttpGet("getAppConfig")]
    public async Task<ConfigResult> GetConfig(string configKey){
        HttpClient client = new HttpClient();
        var daprResponse = await client.GetAsync($"http://localhost:5010/v1.0/configuration/food-config?key={configKey}&metadata.label=dev");
        if(daprResponse.IsSuccessStatusCode == false)
            throw new Exception(await daprResponse.Content.ReadAsStringAsync());

        var json = await daprResponse.Content.ReadAsStringAsync();
        return new ConfigResult { Name = configKey, Value = JObject.Parse(json)[configKey].ToString() };
    }
}
