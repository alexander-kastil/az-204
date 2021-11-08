using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Azure.Storage;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;

namespace BlobStorageConsole
{
    class Program
    {
        static async Task Main(string[] args)
        {
            string connectionString = "DefaultEndpointsProtocol=https;AccountName=foodpics14889;AccountKey=nZLDBi9qKhMaQ+ww0JFdlUrZsWQHm4SbPuYyxHdusC9+tM89pcPsWcTz+Wba2diT/MtEbW5AZJowdFj6v68skQ==;EndpointSuffix=core.windows.net";
            string containerName = "food";

            // In real live you would take the conStr from an env var
            // setx AZURE_STORAGE_CONNECTION_STRING "DefaultEndpointsProtocol=https;AccountName=az203storageacct10010;AccountKey=..."
            // string connectionString = Environment.GetEnvironmentVariable("AZURE_STORAGE_CONNECTION_STRING");

            BlobServiceClient blobServiceClient = new BlobServiceClient(connectionString);
            BlobContainerClient containerClient = blobServiceClient.GetBlobContainerClient(containerName);

            Dictionary<string,string> metadata = new Dictionary<string, string>();
            metadata.Add("restaurant", "fusion");
            await containerClient.SetMetadataAsync(metadata);

            await
            foreach (BlobItem blobItem in containerClient.GetBlobsAsync())
            {
                Console.WriteLine("\t" + blobItem.Name + " " + blobItem.Properties.ETag);
            }

            string localPath = "../food-pics/";
            string fileName = "falaffel.jpg";
            string localFilePath = Path.Combine(localPath, fileName);

            // Get a reference to a blob
            BlobClient blobClient = containerClient.GetBlobClient(fileName);

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