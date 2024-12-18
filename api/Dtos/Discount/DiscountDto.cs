using api.Enums;

namespace api.Dtos.Discount
{
    public class DiscountDto
    {
        public int Id { get; set; }
        public int MerchantId { get; set; }
        public string Title { get; set; } = string.Empty;
        public int Percentage { get; set; }
        public DateTime ExpiresOn { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public Status Status { get; set; }
    }
}