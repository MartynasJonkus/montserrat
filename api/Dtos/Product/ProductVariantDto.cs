using api.Enums;

namespace api.Dtos.Product
{
    public class ProductVariantDto
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string Title { get; set; } = string.Empty;
        public decimal AdditionalPrice { get; set; }
        public int Quantity { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public Status Status { get; set; }
    }
}