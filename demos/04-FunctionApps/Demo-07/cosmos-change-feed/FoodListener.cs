using System;
using System.Collections.Generic;
using Microsoft.Azure.Documents;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace Integrations
{
    public static class FoodListener
    {
        [FunctionName("FoodListener")]
        public static void Run([CosmosDBTrigger(
            databaseName: "fooddb",
            collectionName: "food",
            ConnectionStringSetting = "conCosmosDB",
            CreateLeaseCollectionIfNotExists = true,
            LeaseCollectionName = "leases")]IReadOnlyList<Document> input, ILogger log)
        {
            log.LogInformation("Documents modified " + input.Count);

            foreach (var document in input)
            {
                var food = JsonSerializer.Deserialize<Food>(document.ToString());
                log.LogInformation("Changed food " + food.name);
            }
        }
    }
}
