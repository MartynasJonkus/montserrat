using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Discount
    {
        public int DiscountID { get; set; } // Primary key
        public string Name { get; set; } = string.Empty;
        [Column(TypeName = "decimal(5, 2)")]
        public decimal Value { get; set; }
        public bool IsPercentage { get; set; }
        public int AmountAvailable { get; set; }
        public DateTime ValidFrom { get; set; }
        public DateTime ValidTo { get; set; }

        // Navigation properties
        public ICollection<GroupDiscount> GroupDiscounts { get; set; }
        public ICollection<ItemDiscount> ItemDiscounts { get; set; }
        public ICollection<Order> Orders { get; set; }
    }
}