using System;
using System.Collections.Generic;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Integrations
{
    public class ProcessFeed
    {
        private readonly ILogger logger;
  
        public ProcessFeed(ILoggerFactory loggerFactory)
        {
            logger = loggerFactory.CreateLogger<ProcessFeed>();
        }

        [Function("ProcessFeed")]
        public void Run([CosmosDBTrigger(
            databaseName: "fooddb-dev",
            containerName: "food",
            Connection = "foodcosmosdev_DOCUMENTDB",
            LeaseContainerName = "leases",
            CreateLeaseContainerIfNotExists = true)] IReadOnlyList<Food> input)
        {
            if (input != null && input.Count > 0)
            {
                logger.LogInformation("Documents modified: " + input.Count);
                logger.LogInformation("First document Id: " + input[0].id);
            }

            if (input != null)
            {
                foreach (var document in input)
                {
                    var json = document.ToString();
                    if (json != null)
                    {
                        var food = JsonConvert.DeserializeObject<Food>(json);
                         logger.LogInformation("Changed food " + food?.name);
                    }
                   
                }
            }           
        }
    }
}
