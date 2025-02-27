using System.ComponentModel.DataAnnotations.Schema;
using api.Enums;

namespace api.Models
{
    public class Payment
    {
        public int Id { get; set; }
        public int MerchantId { get; set; }
        public int? ReservationId { get; set; }
        public int? OrderId { get; set; }
        public int? GiftcardId { get; set; }
        public int? RefundId { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal TipAmount { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal TotalAmount { get; set; }
        public string Currency { get; set; } = string.Empty;
        public PaymentMethod Method { get; set; }
        public PaymentType PaymentType { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public required Merchant Merchant { get; set; }
        public Reservation? Reservation { get; set; }
        public Order? Order { get; set; }
        public GiftCard? GiftCard { get; set; }
        public Refund? Refund { get; set; }
    }
}