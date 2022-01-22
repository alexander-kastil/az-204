using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;

namespace Integrations
{
    public class PictureProcessor
    {
        [FunctionName("PictureProcessor")]
        public void Run([BlobTrigger("drop/{name}", Connection = "AzureWebJobsStorage")]Stream image, string name, [Blob("processed/{name}", FileAccess.Write)] Stream imageSmall, ILogger log)
        {
            IImageFormat format;
            using (Image<Rgba32> input = Image.Load<Rgba32>(image, out format))
            {
                ResizeImage(input, imageSmall, ImageSize.Small, format);
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
            { ImageSize.ExtraSmall, (320, 200) },
            { ImageSize.Small,      (640, 400) },
            { ImageSize.Medium,     (800, 600) }
        };
    }
}

