using System.Collections.Generic;
using System.Threading.Tasks;

namespace FoodApp.Orders
{
    public interface ICosmosDbService
    {
        Task<IEnumerable<Order>> GetOrdersAsync(string query);
        Task<Order> GetOrderAsync(string id);
        Task AddOrderAsync(Order Order);
        Task UpdateOrderAsync(string id, Order Order);
        Task DeleteOrderAsync(string id);
    }
}