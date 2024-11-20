using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models.Structs;

namespace api.Models.Entities
{
    public class Service
    {
        public int Id { get; set; } // Primary Key
        public int MerchantId { get; set; } // Foreign Key
        public string Title { get; set; } = string.Empty;
        public int? CategoryId { get; set; } // Foreign Key (optional)
        public Price Price { get; set; }
        public int? DiscountId { get; set; } // Foreign Key (optional)
        public int? TaxId { get; set; } // Foreign Key (optional)
        public int Duration { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Navigation Properties
        public Merchant Merchant { get; set; }
        public Category? Category { get; set; }
        public Discount? Discount { get; set; }
        public Tax? Tax { get; set; }
        public List<Reservation> Reservations { get; set; } = new();
    }
}