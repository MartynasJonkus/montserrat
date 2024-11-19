using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;

namespace api.Models
{
    public class Payment
    {
        public int PaymentID { get; set; } // Primary key
        public int OrderID { get; set; } // Foreign key
        public PaymentMethod Method { get; set; }
        [Column(TypeName = "decimal(10, 2)")]
        public decimal AmountPaid { get; set; }
        public string StripeTransactionID { get; set; } = string.Empty;
        public DateTime PaymentDate { get; set; }

        // Navigation property
        public Order Order { get; set; }
    }
}