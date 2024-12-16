using api.Enums;

namespace api.Dtos.Payment
{
    public class PaymentDto
    {
        public int Id { get; set; }
        public int? ReservationId { get; set; }
        public int? OrderId { get; set; }
        public int? GiftcardId { get; set; }
        public int? RefundId { get; set; }
        public decimal TipAmount { get; set; }
        public decimal TotalAmount { get; set; }
        public string Currency { get; set; } = string.Empty;
        public PaymentMethod Method { get; set; }
        public PaymentType PaymentType { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}