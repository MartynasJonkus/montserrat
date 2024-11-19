using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class GroupDiscount
    {
        public int ID { get; set; } // Primary key
        public int DiscountID { get; set; } // Foreign key
        public int GroupID { get; set; } // Foreign key

        // Navigation properties
        public ItemGroup ItemGroup { get; set; }
        public Discount Discount { get; set; }
    }
}