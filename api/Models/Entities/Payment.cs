using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;

namespace api.Models.Entities
{
    public class Payment
    {
        public int Id { get; set; } // Primary Key
        [Column(TypeName = "decimal(18, 2)")]
        public decimal TipAmount { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal TotalAmount { get; set; }
        public string Currency { get; set; } = string.Empty;
        public PaymentMethod Method { get; set; }
        public PaymentType PaymentType { get; set; }
        public int? ReservationId { get; set; } // Foreign Key (optional)
        public int? OrderId { get; set; } // Foreign Key (optional)
        public DateTime CreatedAt { get; set; }

        // Navigation Properties
        public Reservation Reservation { get; set; }
        public GiftCard? GiftCard { get; set; }
    }
}