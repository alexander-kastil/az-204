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
var sqlQueryText = "SELECT * FROM f WHERE f.kitchen = 'Russia' ORDER by f.amount DESC";
QueryDefinition queryDefinition = new QueryDefinition(sqlQueryText);
FeedIterator<Food> queryResultSetIterator = container.GetItemQueryIterator<Food>(queryDefinition);

List<Food> russianFood = new List<Food>();

while (queryResultSetIterator.HasMoreResults)
{
    FeedResponse<Food> currentResultSet = queryResultSetIterator.ReadNextAsync().Result;
    foreach (Food Food in currentResultSet)
    {
        russianFood.Add(Food);
        Console.WriteLine("\tRead {0}\n", Food.name);
    }
}

// Write to Cosmos DB
Food orangeSoda = new Food
{
    id = "9994",
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
context.Food.Add(new Food() { id = "2222", name = "Hazelenut Protein", amount = 1 });
context.SaveChanges();

// Discontinued Trigger
Food discont = new Food
{
    id = "1111",
    name = "Orange Soda Bitter",
    amount = 2
};

Food triggerItem = await container.CreateItemAsync(discont, null, new ItemRequestOptions
{
    PostTriggers = new List<string>{
                "KitchenTrigger"
            }
});

Console.WriteLine("\tDiscontinued: {0}\n", triggerItem.kitchen);