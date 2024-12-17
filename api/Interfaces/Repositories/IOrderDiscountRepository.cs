using api.Dtos.Order;
using api.Enums;
using api.Models;

namespace api.Interfaces.Repositories
{
    public interface IOrderDiscountRepository
    {
        Task<OrderDiscount?> GetOrderDiscountByIdAsync(int id);
        Task<IEnumerable<OrderDiscount>> GetAllOrderDiscountsAsync(int merchantId, EmployeeType employeeType, int pageNumber, int pageSize);
        Task AddOrderDiscountAsync(OrderDiscount orderDiscount);
        Task UpdateOrderDiscountAsync(OrderDiscount orderDiscount);
        Task DeleteOrderDiscountAsync(OrderDiscount orderDiscount);
    }
}