using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class OrderItem
    {
        public int OrderID { get; set; } // Foreign key
        public int ItemID { get; set; } // Foreign key
        public string Name { get; set; } = string.Empty;
        public int Quantity { get; set; }
        [Column(TypeName = "decimal(10, 2)")]
        public decimal Price { get; set; }
        [Column(TypeName = "decimal(10, 2)")]
        public decimal DiscountAmount { get; set; }
        [Column(TypeName = "decimal(10, 2)")]
        public decimal TaxAmount { get; set; }

        // Navigation properties
        public Order Order { get; set; }
        public Item Item { get; set; }

    }
}