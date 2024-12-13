using api.Enums;
using api.Models;

namespace api.Dtos.Order
{
    public class OrderDto
    {
        public int Id { get; set; }
        public int MerchantId { get; set; }
        public int? OrderDiscountId { get; set; }
        public OrderStatus Status { get; set; }
        public required Price TotalAmount { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public List<OrderItemDto> OrderItems { get; set; } = [];
    }
}