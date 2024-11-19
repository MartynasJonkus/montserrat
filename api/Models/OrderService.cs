using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class OrderService
    {
        public int OrderID { get; set; } // Foreign key
        public int ServiceID { get; set; } // Foreign key
        [Column(TypeName = "decimal(10, 2)")]
        public decimal Price { get; set; }

        // Navigation properties
        public Order Order { get; set; }
        public Service Service { get; set; }

    }
}