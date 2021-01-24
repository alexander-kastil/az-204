using System;
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
            // setx AZURE_STORAGE_CONNECTION_STRING "DefaultEndpointsProtocol=https;AccountName=az203storageacct10010;AccountKey=..."
            Console.WriteLine("Blob Example");
            // string connectionString = Environment.GetEnvironmentVariable("AZURE_STORAGE_CONNECTION_STRING");
            string connectionString = "DefaultEndpointsProtocol=https;AccountName=storage0078;AccountKey=yxe4XysMdEOonXaHhWenbLO3Ar04ceBj6AUyH7XSRdkC1Sh//3jjWImXF5oF7f1rGQxDx5c6asfcB7rsYbREFw==;EndpointSuffix=core.windows.net";

            BlobServiceClient blobServiceClient = new BlobServiceClient(connectionString);
            string containerName = "demo" + Guid.NewGuid().ToString(); ;
            BlobContainerClient containerClient = await blobServiceClient.CreateBlobContainerAsync(containerName);

            await
            foreach (BlobItem blobItem in containerClient.GetBlobsAsync())
            {
                Console.WriteLine("\t" + blobItem.Name);
            }

            string localPath = "./textfiles/";
            string fileName = "quickstart" + Guid.NewGuid().ToString() + ".txt";
            string localFilePath = Path.Combine(localPath, fileName);

            // Write text to the file
            await File.WriteAllTextAsync(localFilePath, "Hello, World!");

            // Get a reference to a blob
            BlobClient blobClient = containerClient.GetBlobClient(fileName);

            Console.WriteLine("Uploading to Blob storage as blob:\n\t {0}\n", blobClient.Uri);

            // Open the file and upload its data
            using FileStream uploadFileStream = File.OpenRead(localFilePath);
            await blobClient.UploadAsync(uploadFileStream);
            uploadFileStream.Close();
        }
    }
}