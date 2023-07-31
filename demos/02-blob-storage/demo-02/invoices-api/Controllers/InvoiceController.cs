using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Azure.Storage;
using Azure.Storage.Blobs;
using Azure.Storage.Sas;
using Microsoft.AspNetCore.Mvc;

namespace FoodApp
{
    [Route("/[controller]")]
    [ApiController]
    public class InvoicesController : ControllerBase
    {
        AppConfig cfg;
        BlobContainerClient client;

        public InvoicesController(IConfiguration config, BlobContainerClient bclient)
        {
            cfg = config.Get<AppConfig>();
            client = bclient;
        }


        [HttpGet]
        public ActionResult<IEnumerable<InvoiceItem>> Get()
        {
            var blobs = client.GetBlobs();
            var blobList = new List<InvoiceItem>();
            foreach (var blob in blobs)
            {
                BlobClient blobClient = client.GetBlobClient(blob.Name);
                var url = $"{client.Uri.AbsoluteUri}/{blob.Name}{GetBlobSas(client.GetBlobClient(blob.Name))}";
                blobList.Add(new InvoiceItem{Name = blob.Name, Url = url });
            }
            return blobList;
        }

        private string GetBlobSas(BlobClient blob)
        {
            // Create a user SAS that only allows reading for a minute
            BlobSasBuilder sas = new BlobSasBuilder
            {
                BlobContainerName = blob.BlobContainerName,
                BlobName = blob.Name,
                Resource = "b",
                ExpiresOn = DateTimeOffset.UtcNow.AddDays(2)
            };
            // Allow read access
            sas.SetPermissions(BlobSasPermissions.Read);

            // Use the shared key to access the blob
            var storageSharedKeyCredential = new StorageSharedKeyCredential(
                cfg.StorageAccount.AccountName,
                cfg.StorageAccount.AccountKey);

            return '?' + sas.ToSasQueryParameters(storageSharedKeyCredential).ToString();
        }
    }
}