namespace api.Dtos.Order
{
    public class CreateOrderDto
    {
        public List<CreateOrderItemDto> OrderItems { get; set; } = [];
    }

    public class CreateOrderItemDto
    {
        public int ProductVariantId { get; set; }
        public int Quantity { get; set; }
    }
}