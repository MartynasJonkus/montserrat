using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;
using api.Models.Structs;

namespace api.Models.Entities
{
    public class Order
    {
        public int Id { get; set; } // Primary Key
        public int MerchantId { get; set; } // Foreign Key
        public int? OrderDiscountId { get; set; } // Foreign Key (Optional)
        public OrderStatus Status { get; set; }
        public Price TotalAmount { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Navigation Properties
        public List<OrderItem> OrderItems { get; set; } = new();
        public OrderDiscount? OrderDiscount { get; set; }
        public List<Payment> Payments { get; set; } = new();
    }
}