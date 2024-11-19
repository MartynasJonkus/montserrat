using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class ItemTax
    {
        public int ID { get; set; } // Primary key
        public int TaxID { get; set; } // Foreign key
        public int ItemID { get; set; } // Foreign key

        // Navigation properties
        public Item Item { get; set; }
        public Tax Tax { get; set; }
    }
}