using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models.Structs;

namespace api.Models.Entities
{
    public class OrderItem
    {
        public int Id { get; set; } // Primary Key
        public int OrderId { get; set; } // Foreign Key
        public int ProductVariantId { get; set; } // Foreign Key
        public int Quantity { get; set; }
        public Price Price { get; set; }

        // Navigation Properties
        public Order Order { get; set; }
        public ProductVariant ProductVariant { get; set; }
    }
}