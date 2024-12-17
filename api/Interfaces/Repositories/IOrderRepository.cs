using api.Enums;
using api.Models;

namespace api.Interfaces.Repositories
{
    public interface IOrderRepository
    {
        Task<Order?> GetOrderByIdAsync(int id);
        Task<IEnumerable<Order>> GetAllOrdersAsync(int merchantId, EmployeeType employeeType, OrderStatus? orderStatus, string sortOrder, int pageNumber, int pageSize);
        Task AddOrderAsync(Order order);
        Task UpdateOrderAsync(Order order);
        Task DeleteOrderAsync(int id);
    }
}