namespace api.Dtos.Order
{
    public class CreateOrderDto
    {
        public int MerchantId { get; set; }
        public List<CreateOrderItemDto> OrderItems { get; set; } = [];
    }

    public class CreateOrderItemDto
    {
        public int ProductVariantId { get; set; }
        public int Quantity { get; set; }
    }
}