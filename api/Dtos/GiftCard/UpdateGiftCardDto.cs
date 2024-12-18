using api.Enums;

namespace api.Dtos.GiftCard
{
    public class UpdateGiftCardDto
    {
        public string Code { get; set; } = string.Empty;
        public decimal Balance { get; set; }
        public string Currency { get; set; } = string.Empty;
        public DateTime? ExpiresOn { get; set; }
        public Status Status { get; set; }
    }
}