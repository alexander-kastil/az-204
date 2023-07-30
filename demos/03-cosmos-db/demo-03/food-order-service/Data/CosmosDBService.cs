using Microsoft.Azure.Cosmos;

namespace FoodApp.Orders
{
    public class CosmosDbService : ICosmosDbService
    {
        private Container _container;
        private readonly ICosmosDbService _cosmosDbService;

        public CosmosDbService(
                CosmosClient dbClient,
                string databaseName,
                string containerName)
        {
            this._container = dbClient.GetContainer(databaseName, containerName);
        }

        public async Task<IEnumerable<Order>> GetOrdersAsync(string queryString)
        {
            var query = this._container.GetItemQueryIterator<Order>(new QueryDefinition(queryString));
            List<Order> results = new List<Order>();
            while (query.HasMoreResults)
            {
                var response = await query.ReadNextAsync();

                results.AddRange(response.ToList());
            }

            return results;
        }


        public async Task<Order> GetOrderAsync(string id)
        {
            try
            {
                ItemResponse<Order> response = await this._container.ReadItemAsync<Order>(id, new PartitionKey(id));
                return response.Resource;
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return null;
            }

        }

        public async Task AddOrderAsync(Order item)
        {
            await this._container.CreateItemAsync<Order>(item, new PartitionKey(item.Id));
        }

        public async Task DeleteOrderAsync(string id)
        {
            await this._container.DeleteItemAsync<Order>(id, new PartitionKey(id));
        }

        public async Task UpdateOrderAsync(string id, Order item)
        {
            await this._container.UpsertItemAsync<Order>(item, new PartitionKey(id));
        }
    }
}