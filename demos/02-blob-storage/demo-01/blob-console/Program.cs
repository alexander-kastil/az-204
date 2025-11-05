using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.Extensions.Configuration;

namespace BlobStorageConsole
{
    class Program
    {
        static async Task Main(string[] args)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            IConfigurationRoot configuration = builder.Build();
            var connectionString = configuration["blobConnectionString"];
            string blobContainerName = configuration["blobContainerName"];

            BlobServiceClient blobServiceClient = new BlobServiceClient(connectionString);
            BlobContainerClient containerClient = blobServiceClient.GetBlobContainerClient(blobContainerName);

            Dictionary<string,string> metadata = new Dictionary<string, string>();
            metadata.Add("restaurant", "aisa");
            await containerClient.SetMetadataAsync(metadata);

            await
            foreach (BlobItem blobItem in containerClient.GetBlobsAsync())
            {
                Console.WriteLine("\t" + blobItem.Name + " " + blobItem.Properties.ETag);
            }

            string picFolder = configuration["pictureFolder"];
            string pic = configuration["pic"];
            string localFilePath = Path.Combine(picFolder, pic);

            // Get a reference to a blob
            BlobClient blobClient = containerClient.GetBlobClient(pic);

            Console.WriteLine("Uploading to pic:\n\t {0}\n", blobClient.Uri);

            // Open the file and upload its data
            using FileStream uploadFileStream = File.OpenRead(localFilePath);
            await blobClient.UploadAsync(uploadFileStream);
            uploadFileStream.Close();

            Dictionary<string,string> bmetadata = new Dictionary<string, string>();
            bmetadata.Add("vegan", "true");
            await blobClient.SetMetadataAsync(bmetadata);
        }
    }
}