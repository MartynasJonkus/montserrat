using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class ServiceCharge
    {
        public int ServiceChargeID { get; set; } // Primary key
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        [Column(TypeName = "decimal(5, 2)")]
        public decimal Value { get; set; }
        public bool IsPercentage { get; set; }
        public DateTime LastUpdated { get; set; }

        // Navigation property
        public ICollection<Order> Orders { get; set; }
    }
}