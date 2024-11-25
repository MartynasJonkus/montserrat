using System.ComponentModel.DataAnnotations.Schema;
using api.Models.Structs;

namespace api.Models.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public int MerchantId { get; set; }
        public int? CategoryId { get; set; }
        public int? DiscountId { get; set; }
        public int? TaxId { get; set; }
        public string Title { get; set; } = string.Empty;
        public Price Price { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Weight { get; set; }
        public string WeightUnit { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public required Merchant Merchant { get; set; }
        public Category? Category { get; set; }
        public Discount? Discount { get; set; }
        public Tax? Tax { get; set; }
        public List<ProductVariant> ProductVariants { get; set; } = [];
    }
}