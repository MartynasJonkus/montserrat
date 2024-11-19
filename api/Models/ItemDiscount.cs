using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class ItemDiscount
    {
        public int ID { get; set; } // Primary key
        public int DiscountID { get; set; } // Foreign key
        public int ItemID { get; set; } // Foreign key

        // Navigation properties
        public Discount Discount { get; set; }
        public Item Item { get; set; }
    }
}