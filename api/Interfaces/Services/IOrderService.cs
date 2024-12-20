using api.Dtos.Order;
using api.Enums;
using api.Models;

namespace api.Interfaces.Services
{
    public interface IOrderService
    {
        Task<OrderDto?> GetOrderByIdAsync(int orderId);
        Task<IEnumerable<OrderDto>> GetAllOrdersAsync(int merchantId, EmployeeType employeeType, OrderStatus? orderStatus, string sortOrder, int pageNumber, int pageSize);
        Task<OrderDto> CreateOrderAsync(int merchantId, CreateOrderDto dto);
        Task<OrderDto?> UpdateOrderAsync(int orderId, UpdateOrderDto updateOrderDto);
        Task<bool> DeleteOrderAsync(int orderId);
        Task<OrderDto?> UpdateOrderDiscount (int orderId, int? orderDiscountId);
    }
}
