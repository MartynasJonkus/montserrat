using api.Models;

namespace api.Interfaces.Repositories
{
    public interface IOrderRepository
    {
        Task<Order?> GetOrderByIdAsync(int id);
        Task<IEnumerable<Order>> GetAllOrdersAsync();
        Task AddOrderAsync(Order order);
        Task UpdateOrderAsync(Order order);
        Task DeleteOrderAsync(int id);
    }
}