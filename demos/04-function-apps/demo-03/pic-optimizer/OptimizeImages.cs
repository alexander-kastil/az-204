using System.IO;
using System.Threading.Tasks;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;

namespace Company.Function
{
    public class OptimizeImages
    {
        private readonly ILogger<OptimizeImages> _logger;

        public OptimizeImages(ILogger<OptimizeImages> logger)
        {
            _logger = logger;
        }

        [Function(nameof(OptimizeImages))]
        public async Task Run([BlobTrigger("drop/{name}", Connection = "conStorage")] Stream stream, string name)
        {
            // using var blobStreamReader = new StreamReader(stream);
            // var content = await blobStreamReader.ReadToEndAsync();        
           IImageFormat format;
            using (Image<Rgba32> input = Image.Load<Rgba32>(stream, out format))
            {
                ResizeImage(input, imageSmall, ImageSize.ExtraSmall, format);
                log.LogInformation($"resized: {name}");
            }
        }

         public static void ResizeImage(Image<Rgba32> input, Stream output, ImageSize size, IImageFormat format)
        {
            var dimensions = imageDimensionsTable[size];
            input.Mutate(x => x.Resize(dimensions.Item1, dimensions.Item2));
            input.Save(output, format);
        }

        public enum ImageSize { ExtraSmall, Small, Medium }

        private static Dictionary<ImageSize, (int, int)> imageDimensionsTable = new Dictionary<ImageSize, (int, int)>() {
            { ImageSize.ExtraSmall, (150, 130) },
            { ImageSize.Small,      (640, 400) },
            { ImageSize.Medium,     (800, 600) }
        };
    }
}
