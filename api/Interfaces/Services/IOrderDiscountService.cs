using api.Dtos.Order;
using api.Enums;
using api.Models;

namespace api.Interfaces.Services
{
    public interface IOrderDiscountService
    {
        Task<OrderDiscountDto?> GetOrderDiscountAsync(int id);
        Task<IEnumerable<OrderDiscountDto>> GetAllOrderDiscountsAsync(int merchantId, EmployeeType employeeType, int pageNumber, int pageSize);
        Task<OrderDiscountDto> CreateOrderDiscountAsync(int merchantId, CreateUpdateOrderDiscountDto createUpdateOrderDiscountDto);
        Task<OrderDiscount> UpdateOrderDiscountAsync(int id, CreateUpdateOrderDiscountDto createUpdateOrderDiscountDto);
        Task<bool> DeleteOrderDiscountAsync(int id);
    }
}