using api.Enums;

namespace api.Dtos.Tax
{
    public class CreateUpdateTaxDto
    {
        public int MerchantId { get; set; }
        public string Title { get; set; } = string.Empty;
        public int Percentage { get; set; }
        public Status Status { get; set; }
    }
}