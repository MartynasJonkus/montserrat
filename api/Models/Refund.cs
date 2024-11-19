using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Refund
    {
        public int RefundID { get; set; } // Primary key
        public int OrderID { get; set; } // Foreign key
        public DateTime RefundDate { get; set; }
        [Column(TypeName = "decimal(10, 2)")]
        public decimal Amount { get; set; }
        public string Reason { get; set; } = string.Empty;

        // Navigation property
        public Order Order { get; set; }
    }
}