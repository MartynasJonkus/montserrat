using api.Enums;
using api.Models;

namespace api.Dtos.Product
{
    public class ProductDto
    {
        public int Id { get; set; }
        public int MerchantId { get; set; }
        public int? CategoryId { get; set; }
        public int? DiscountId { get; set; }
        public int? TaxId { get; set; }
        public string Title { get; set; } = string.Empty;
        public required Price Price { get; set; }
        public decimal Weight { get; set; }
        public string WeightUnit { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
        public Status Status { get; set; }

        public List<ProductVariantDto> ProductVariants { get; set; } = [];
    }
}