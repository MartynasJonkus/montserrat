using api.Enums;

namespace api.Dtos.GiftCard
{
    public class CreateGiftCardDto
    {
        public string Code { get; set; } = string.Empty;
        public decimal InitialBalance { get; set; }
        public string Currency { get; set; } = string.Empty;
        public DateTime? ExpiresOn { get; set; }
        public Status Status { get; set; }
    }
}