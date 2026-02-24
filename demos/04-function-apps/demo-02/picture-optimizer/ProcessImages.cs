using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Azure.Storage.Blobs;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;

namespace picture_optimizer;

public class ProcessImages
{
    private readonly ILogger<ProcessImages> _logger;
    private readonly BlobContainerClient _blobContainerClient;

    public ProcessImages(ILogger<ProcessImages> logger, BlobContainerClient blobContainerClient)
    {
        _logger = logger;
        _blobContainerClient = blobContainerClient;
    }

    [Function(nameof(ProcessImages))]
    public async Task Run(
        [BlobTrigger("drop/{name}", Connection = "picprocessordev_STORAGE")] Stream image,
        string name)
    {
        var format = Image.DetectFormat(image);
        image.Position = 0;
        using (Image<Rgba32> input = Image.Load<Rgba32>(image))
        {
            using var outputStream = new MemoryStream();
            ResizeImage(input, outputStream, ImageSize.ExtraSmall, format);
            outputStream.Seek(0, SeekOrigin.Begin);

            var blobClient = _blobContainerClient.GetBlobClient($"{name}");
            await blobClient.UploadAsync(outputStream, overwrite: true);

            _logger.LogInformation("Resized: {name}", name);
        }
    }

    private static void ResizeImage(Image<Rgba32> input, Stream output, ImageSize size, IImageFormat format)
    {
        var dimensions = ImageDimensionsTable[size];
        input.Mutate(x => x.Resize(dimensions.Item1, dimensions.Item2));
        input.Save(output, format);
    }

    private enum ImageSize { ExtraSmall, Small, Medium }

    private static readonly Dictionary<ImageSize, (int, int)> ImageDimensionsTable = new()
    {
        { ImageSize.ExtraSmall, (150, 130) },
        { ImageSize.Small, (640, 400) },
        { ImageSize.Medium, (800, 600) }
    };
}