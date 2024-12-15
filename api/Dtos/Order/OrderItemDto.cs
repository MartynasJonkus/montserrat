using api.Models;

namespace api.Dtos.Order
{
    public class OrderItemDto
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int ProductVariantId { get; set; }
        public int Quantity { get; set; }
        public required Price Price { get; set; }
    }
}