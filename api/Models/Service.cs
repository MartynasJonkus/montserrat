using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Service
    {
        public int ServiceID { get; set; } // Primary key
        public string ServiceName { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        [Column(TypeName = "decimal(10, 2)")]
        public decimal Price { get; set; }
        public int Duration { get; set; }
        public bool IsActive { get; set; }
        public int AssociatedEmployeeID { get; set; } // Foreign key

        // Navigation properties
        public User User { get; set; }
        public ICollection<OrderService> OrderServices { get; set; }
    }
}