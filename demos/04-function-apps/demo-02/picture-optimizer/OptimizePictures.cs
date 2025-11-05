using System.IO;
using System.Threading.Tasks;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace Integrations;

public class OptimizePictures
{
    private readonly ILogger<OptimizePictures> _logger;

    public OptimizePictures(ILogger<OptimizePictures> logger)
    {
        _logger = logger;
    }

    [Function(nameof(OptimizePictures))]
    public async Task Run([BlobTrigger("drop/{name}", Connection = "picprocessor23502_STORAGE")] Stream stream, string name)
    {
        using var blobStreamReader = new StreamReader(stream);
        var content = await blobStreamReader.ReadToEndAsync();
        _logger.LogInformation("C# Blob trigger function Processed blob\n Name: {name} \n Data: {content}", name, content);
    }
}