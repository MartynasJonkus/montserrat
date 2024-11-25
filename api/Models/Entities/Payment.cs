using System.ComponentModel.DataAnnotations.Schema;
using api.Enums;

namespace api.Models.Entities
{
    public class Payment
    {
        public int Id { get; set; }
        public int? ReservationId { get; set; }
        public int? OrderId { get; set; }
        public int? GiftcardId { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal TipAmount { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal TotalAmount { get; set; }
        public string Currency { get; set; } = string.Empty;
        public PaymentMethod Method { get; set; }
        public PaymentType PaymentType { get; set; }
        public DateTime CreatedAt { get; set; }

        public Reservation? Reservation { get; set; }
        public Order? Order { get; set; }
        public GiftCard? GiftCard { get; set; }
    }
}