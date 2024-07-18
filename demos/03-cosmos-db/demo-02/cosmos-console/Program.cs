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
var containerName = configuration["Container"];
var conStr = $"AccountEndpoint={accountEndpoint};AccountKey={accountKey};";

// CosmosClientOptions options = new CosmosClientOptions()
// {
//     ConsistencyLevel = ConsistencyLevel.Session,
//     ConnectionMode = ConnectionMode.Direct
// };
CosmosClient client = new CosmosClient(conStr);

AccountProperties account = await client.ReadAccountAsync();
Console.WriteLine($"Account Name:\t{account.Id}");
Console.WriteLine($"Primary Region:\t{account.WritableRegions.FirstOrDefault()?.Name}");

Database database = client.GetDatabase(db);
Container container = database.GetContainer(containerName);

// Read from Cosmos DB
var sqlQueryText = "SELECT * FROM f WHERE f.kitchen = 'Thai' ORDER by f.amount DESC";
QueryDefinition queryDefinition = new QueryDefinition(sqlQueryText);
FeedIterator<Food> queryResultSetIterator = container.GetItemQueryIterator<Food>(queryDefinition);

List<Food> thaiFood = new List<Food>();

while (queryResultSetIterator.HasMoreResults)
{
    FeedResponse<Food> currentResultSet = queryResultSetIterator.ReadNextAsync().Result;
    foreach (Food Food in currentResultSet)
    {
        thaiFood.Add(Food);
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
.Where(f => f.kitchen == "India")
.ToFeedIterator<Food>())
{
    while (setIterator.HasMoreResults)
    {
        foreach (var Food in await setIterator.ReadNextAsync())
        {
            {
                Console.WriteLine("Indian Food: " + Food.name);
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
Food food = new Food
{
    id = "1111",
    name = "Orange Soda Bitter",
    amount = 2
};

Food triggerItem = await container.CreateItemAsync(food, null, new ItemRequestOptions
{
    PostTriggers = new List<string>{
        "KitchenTrigger"
    }
});

Console.WriteLine("\tDiscontinued: {0}\n", triggerItem.kitchen);
