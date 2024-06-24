using Azure.Core;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Microsoft.AspNetCore.Mvc;

namespace kv_api;

[ApiController]
[Route("[controller]")]
public class KeyVaultController : ControllerBase
{
    private readonly ILogger<KeyVaultController> _logger;
    private IConfiguration cfg;

    public KeyVaultController(ILogger<KeyVaultController> logger, IConfiguration configuration)
    {
        _logger = logger;
        cfg = configuration;
    }

    [HttpGet("GetValue")]
    public string Get()
    {
        SecretClientOptions options = new SecretClientOptions()
        {
            Retry =
                    {
                        Delay= TimeSpan.FromSeconds(2),
                        MaxDelay = TimeSpan.FromSeconds(16),
                        MaxRetries = 5,
                        Mode = RetryMode.Exponential
                     }
        };
        var kvEP = cfg.GetValue<string>("AZURE_KEYVAULT_RESOURCEENDPOINT");
        var miid = Environment.GetEnvironmentVariable("AZURE_CLIENT_ID");
        var client = new SecretClient(new Uri(kvEP), new ManagedIdentityCredential(miid), options);
        var secret = client.GetSecret("sc-secret");
        return secret.Value.Value;
    }
}
