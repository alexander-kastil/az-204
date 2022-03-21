// See https://aka.ms/new-console-template for more information
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.Cosmos.Linq;
using Microsoft.Extensions.Configuration;

var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
IConfigurationRoot configuration = builder.Build();

var accountEndpoint = configuration["accountEndpoint"];
var accountKey = configuration["accountKey"];
var db = configuration["DBName"];
var collection = configuration["Collection"];
var conStr = $"AccountEndpoint={accountEndpoint};AccountKey={accountKey};";

CosmosClient cclient;
Database database;
Container container;

cclient = new CosmosClient(conStr);
database = cclient.GetDatabase(db);
container = database.GetContainer(collection);

// Read from Cosmos DB
var sqlQueryText = "SELECT * FROM c WHERE c.Color = 'Red'";
QueryDefinition queryDefinition = new QueryDefinition(sqlQueryText);
FeedIterator<Food> queryResultSetIterator = container.GetItemQueryIterator<Food>(queryDefinition);

List<Food> redFoods = new List<Food>();

while (queryResultSetIterator.HasMoreResults)
{
    FeedResponse<Food> currentResultSet = queryResultSetIterator.ReadNextAsync().Result;
    foreach (Food Food in currentResultSet)
    {
        redFoods.Add(Food);
        Console.WriteLine("\tRead {0}\n", Food.name);
    }
}

// Write to Cosmos DB
Food orangeSoda = new Food
{
    id = "9996",
    name = "Orange Soda",
    amount = 10
};

Food item = await container.CreateItemAsync(orangeSoda);

// Update item
orangeSoda.name = "Fish and Chips";
item = await container.UpsertItemAsync(orangeSoda);

// Linq Queries
using (FeedIterator<Food> setIterator = container.GetItemLinqQueryable<Food>()
.Where(f => f.kitchen == "Red")
.ToFeedIterator<Food>())
{
    while (setIterator.HasMoreResults)
    {
        foreach (var Food in await setIterator.ReadNextAsync())
        {
            {
                Console.WriteLine(Food.name);
            }
        }
    }
}

// Entity Framework
var context = new FoodDbContext(accountEndpoint, accountKey, db);
context.Database.EnsureCreated();
context.Food.Add(new Food() { id = "8888", Name = "Hazelenut Protein", FoodNumber = "Whey HZ", Promotion = false });
context.SaveChanges();

// Discontinued Trigger
Food discont = new Food
{
    id = "9999",
    Name = "Orange Soda Bitter",
    FoodNumber = "ABC",
    Promotion = true
};

Food discontitem = await container.CreateItemAsync(discont, null, new ItemRequestOptions
{
    PreTriggers = new List<string>{
                "DiscontinuedTrigger"
            }
});

Console.WriteLine("\tDiscontinued: {0}\n", discontitem.Discontinued);