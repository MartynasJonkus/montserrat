using api.Enums;

namespace api.Dtos.Order
{
    public class UpdateOrderDto
    {
        public int? OrderDiscountId { get; set; }
        public OrderStatus Status { get; set; }

        public List<CreateOrderItemDto> OrderItems { get; set; } = [];
    }
}