using api.Enums;

namespace api.Dtos.GiftCard
{
    public class GiftCardDto
    {
        public int Id { get; set; }
        public int MerchantId { get; set; }
        public string Code { get; set; } = string.Empty;
        public decimal InitialBalance { get; set; }
        public decimal Balance { get; set; }
        public string Currency { get; set; } = string.Empty;
        public DateTime? ExpiresOn { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public Status Status { get; set; }
    }
}