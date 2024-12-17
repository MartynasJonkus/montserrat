using api.Enums;

namespace api.Dtos.Tax
{
    public class TaxDto
    {
        public int Id { get; set; }
        public int MerchantId { get; set; }
        public string Title { get; set; } = string.Empty;
        public int Percentage { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public Status Status { get; set; }
    }
}