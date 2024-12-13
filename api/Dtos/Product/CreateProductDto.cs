using api.Enums;
using api.Models;

namespace api.Dtos.Product
{
    public class CreateProductDto
    {
        public int? CategoryId { get; set; }
        public int? DiscountId { get; set; }
        public int? TaxId { get; set; }
        public string Title { get; set; } = string.Empty;
        public required Price Price { get; set; }
        public decimal Weight { get; set; }
        public string WeightUnit { get; set; } = string.Empty;
        public Status Status { get; set; }
    }
}