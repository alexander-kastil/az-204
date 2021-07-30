using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.Cosmos.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace CosmosReader {
    class Program {
        static async Task Main (string[] args) {

            var builder = new ConfigurationBuilder ()
                .SetBasePath (Directory.GetCurrentDirectory ())
                .AddJsonFile ("appsettings.json", optional : true, reloadOnChange : true);
            IConfigurationRoot configuration = builder.Build ();
            
            var accountEndpoint = configuration["accountEndpoint"];
            var accountKey = configuration["accountKey"];
            var db = configuration["DBName"];
            var collection = configuration["Collection"];
            var conStr = $"AccountEndpoint={accountEndpoint};AccountKey={accountKey};";

            CosmosClient cclient;
            Database database;
            Container container;

            cclient = new CosmosClient (conStr);
            database = cclient.GetDatabase (db);
            container = database.GetContainer (collection);

            // Read from Cosmos DB

            var sqlQueryText = "SELECT * FROM c WHERE c.Color = 'Red'";
            QueryDefinition queryDefinition = new QueryDefinition (sqlQueryText);
            FeedIterator<Product> queryResultSetIterator = container.GetItemQueryIterator<Product> (queryDefinition);

            List<Product> redProducts = new List<Product> ();

            while (queryResultSetIterator.HasMoreResults) {
                FeedResponse<Product> currentResultSet = queryResultSetIterator.ReadNextAsync ().Result;
                foreach (Product product in currentResultSet) {
                    redProducts.Add (product);
                    Console.WriteLine ("\tRead {0}\n", product.ProductNumber);
                }
            }

            // Write to Cosmos DB
            Product orangeSoda = new Product {           
                id = "9996",
                Name = "Orange Soda", 
                ProductNumber = "ABC",
                Color = "yellow"
            };

            Product item = await container.CreateItemAsync(orangeSoda);

            // Update item
            orangeSoda.ProductNumber = "DFG";
            item = await container.UpsertItemAsync(orangeSoda);            
            
            // Linq Queries
            using (FeedIterator<Product> setIterator = container.GetItemLinqQueryable<Product>()
            .Where(p => p.Color == "Red")
            .ToFeedIterator<Product>())
            {
                while (setIterator.HasMoreResults)
                {
                    foreach(var product in await setIterator.ReadNextAsync()){
                    {
                        Console.WriteLine(product.Name);
                        }}
                    }
                }            

            // Entity Framework
            var context = new ProductCosmosDbContext(accountEndpoint, accountKey, db);
            context.Database.EnsureCreated();
            context.Products.Add(new Product(){id = "8888", Name = "Hazelenut Protein", ProductNumber = "Whey HZ", Promotion = false});
            context.SaveChanges(); 
            
            // Discontinued Trigger
            Product discont = new Product {           
                id = "9999",
                Name = "Orange Soda Bitter", 
                ProductNumber = "ABC",                
                Promotion = true
            };

            Product discontitem = await container.CreateItemAsync(discont, null,new ItemRequestOptions{ PreTriggers = new List<string>{
                "DiscontinuedTrigger"
            }});

            Console.WriteLine ("\tDiscontinued: {0}\n", discontitem.Discontinued);
       
       }

    }
}