using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Item
    {
        public int ItemID { get; set; } // Primary key
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public byte[] Image { get; set; }
        public int? GroupID { get; set; } // Foreign key
        [Column(TypeName = "decimal(10, 2)")]
        public decimal Price { get; set; }
        public int Stock { get; set; }

        // Navigation properties
        public ItemGroup ItemGroup { get; set; }
        public ICollection<ItemTax> ItemTaxes { get; set; }
        public ICollection<ItemDiscount> ItemDiscounts { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; }
    }
}