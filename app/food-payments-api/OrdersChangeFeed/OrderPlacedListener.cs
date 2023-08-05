using System;
using System.Collections.Generic;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace FoodApp
{
    public class OrderPlacedListener
    {
        private readonly ILogger _logger;

        public OrderPlacedListener(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<OrderPlacedListener>();
        }

        [Function("orderPlaced")]
        public void Run([CosmosDBTrigger(
            databaseName: "fooddb-dev",
            collectionName: "orders",
            ConnectionStringSetting = "fooddev_DOCUMENTDB",
            LeaseCollectionName = "leases")] IReadOnlyList<MyDocument> input)
        {
            if (input != null && input.Count > 0)
            {
                _logger.LogInformation("Documents modified: " + input.Count);
                _logger.LogInformation("First document Id: " + input[0].Id);
            }
        }
    }

    public class MyDocument
    {
        public string Id { get; set; }

        public string Text { get; set; }

        public int Number { get; set; }

        public bool Boolean { get; set; }
    }
}
