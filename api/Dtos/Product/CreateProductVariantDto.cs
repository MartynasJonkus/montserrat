using api.Enums;

namespace api.Dtos.Product
{
    public class CreateProductVariantDto
    {
        public string Title { get; set; } = string.Empty;
        public decimal AdditionalPrice { get; set; }
        public int Quantity { get; set; }
        public Status Status { get; set; }
    }
}