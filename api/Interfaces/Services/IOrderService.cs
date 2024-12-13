using api.Dtos.Order;
using api.Models;

namespace api.Interfaces.Services
{
    public interface IOrderService
    {
        Task<OrderDto> CreateOrderAsync(int merchantId, CreateOrderDto dto);
        Task<IEnumerable<Order?>> GetAllOrdersAsync();
        Task<OrderDto?> GetOrderByIdAsync(int orderId);
        Task<Order?> UpdateOrderAsync(int orderId, Order orderUpdate);
        Task<bool> DeleteOrderAsync(int orderId);
        Task<Order?> CancelOrderAsync(int orderId);
        Task<Order?> ApplyDiscountAsync(int orderId, int discountId);
    }
}
