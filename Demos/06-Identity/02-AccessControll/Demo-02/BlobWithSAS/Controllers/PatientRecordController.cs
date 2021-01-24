using System;
using System.Collections.Generic;
using Azure.Storage;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Azure.Storage.Sas;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace patientrecords.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatientRecordsController : ControllerBase
    {
        private readonly ILogger<PatientRecordsController> lg;
        private IConfiguration config;

        private BlobContainerClient container;

        public PatientRecordsController(ILogger<PatientRecordsController> logger, IConfiguration iconfiguration)
        {
            lg = logger;
            config = iconfiguration;

            // Azure Blob storage client library v12
            container = new BlobContainerClient(
                config.GetValue<string>("StorageAccount:ConnectionString"),
                config.GetValue<string>("StorageAccount:Container")
            );
        }

        // GET PatientRecord
        [HttpGet]
        public IEnumerable<PatientRecord> Get()
        {
            List<PatientRecord> records = new List<PatientRecord>();

            foreach (BlobItem blobItem in container.GetBlobs())
            {
                BlobClient blob = container.GetBlobClient(blobItem.Name);
                var patient = new PatientRecord { name = blob.Name, imageURI = blob.Uri.ToString() };
                records.Add(patient);
            }

            return records;
        }

        // GET PatientRecord/patient-nnnnnn
        [HttpGet("{Name}")]
        public PatientRecord Get(string name)
        {
            BlobClient blob = container.GetBlobClient(name);
            var token = GetBlobSas(blob);
            return new PatientRecord { name = blob.Name, imageURI = blob.Uri.AbsoluteUri, sasToken = token };
        }

        // GET PatientRecord/patient-nnnnnn/secure
        [HttpGet("{Name}/{secure}")]
        public PatientRecord Get(string name, string flag)
        {
            BlobClient blob = container.GetBlobClient(name);
            var token = GetBlobSas(blob);
            return new PatientRecord { name = blob.Name, imageURI = blob.Uri.AbsoluteUri, sasToken = token };
        }

        private string GetBlobSas(BlobClient blob)
        {
            // Create a user SAS that only allows reading for a minute
            BlobSasBuilder sas = new BlobSasBuilder
            {
                BlobContainerName = blob.BlobContainerName,
                BlobName = blob.Name,
                Resource = "b",
                ExpiresOn = DateTimeOffset.UtcNow.AddMinutes(2)
            };
            // Allow read access
            sas.SetPermissions(BlobSasPermissions.Read);

            // Use the shared key to access the blob
            var storageSharedKeyCredential = new StorageSharedKeyCredential(
                config.GetValue<string>("StorageAccount:AccountName"),
                config.GetValue<string>("StorageAccount:AccountKey")
            );

            return '?' + sas.ToSasQueryParameters(storageSharedKeyCredential).ToString();
        }
    }
}