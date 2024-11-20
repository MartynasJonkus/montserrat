using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models.Entities
{
    public class Discount
    {
        public int Id { get; set; } // Primary Key
        public int MerchantId { get; set; } // Foreign Key
        public string Title { get; set; } = string.Empty;
        [Column(TypeName = "decimal(5, 2)")]
        public decimal Percentage { get; set; }
        public Date ExpiresOn { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Navigation Properties
        public Product Product { get; set; }
        public Service Service { get; set; }
    }
}