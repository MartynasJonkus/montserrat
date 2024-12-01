namespace api.Models
{
    public class OrderItem
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int ProductVariantId { get; set; }
        public int Quantity { get; set; }
        public required Price Price { get; set; }

        public required Order Order { get; set; }
        public required ProductVariant ProductVariant { get; set; }
    }
}