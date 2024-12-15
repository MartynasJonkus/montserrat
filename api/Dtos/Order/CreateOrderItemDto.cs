namespace api.Dtos.Order
{
    public class CreateOrderItemDto
    {
        public int ProductVariantId { get; set; }
        public int Quantity { get; set; }
    }
}