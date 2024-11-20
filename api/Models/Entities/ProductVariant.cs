using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models.Entities
{
    public class ProductVariant
    {
        public int Id { get; set; } // Primary Key
        public int ProductId { get; set; } // Foreign Key
        public string Title { get; set; } = string.Empty;
        [Column(TypeName = "decimal(18, 2)")]
        public int Quantity { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Navigation Properties
        public Product Product { get; set; }
        public List<OrderItem> OrderItems { get; set; } = new();
    }
}