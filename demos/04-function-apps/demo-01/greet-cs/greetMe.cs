using System.Text.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace Integrations;

public class greetMe
{
    private readonly ILogger<greetMe> _logger;

    public greetMe(ILogger<greetMe> logger)
    {
        _logger = logger;
    }

    [Function("greetMe")]
    public async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Anonymous, "post")] HttpRequest req)
    {
        _logger.LogInformation("Processing greetMe request.");

        string requestBody = await new StreamReader(req.Body).ReadToEndAsync();

        if (string.IsNullOrWhiteSpace(requestBody))
        {
            return new BadRequestObjectResult("Request body is empty.");
        }

        try
        {
            using JsonDocument document = JsonDocument.Parse(requestBody);
            if (!document.RootElement.TryGetProperty("name", out JsonElement nameElement) ||
                nameElement.ValueKind != JsonValueKind.String)
            {
                return new BadRequestObjectResult("Please pass a name in the request body.");
            }

            string name = nameElement.GetString() ?? string.Empty;
            if (string.IsNullOrWhiteSpace(name))
            {
                return new BadRequestObjectResult("Please pass a non-empty name in the request body.");
            }

            return new OkObjectResult($"hello, {name}");
        }
        catch (JsonException ex)
        {
            _logger.LogError(ex, "Invalid JSON payload.");
            return new BadRequestObjectResult("Invalid JSON payload.");
        }
    }
}