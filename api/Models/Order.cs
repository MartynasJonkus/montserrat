using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;

namespace api.Models
{
    public class Order
    {
        public int OrderID { get; set; } // Primary key
        public int EmployeeID { get; set; } // Foreign key
        public OrderStatus Status { get; set; }
        public DateTime OrderCreated { get; set; }
        public DateTime OrderClosed { get; set; }
        public int? DiscountID { get; set; } // Foreign key
        [Column(TypeName = "decimal(10, 2)")]
        public decimal DiscountAmount { get; set; }
        public int? ServiceChargeID { get; set; } // Foreign key
        [Column(TypeName = "decimal(10, 2)")]
        public decimal SeriveChargeAmount { get; set; }
        [Column(TypeName = "decimal(10, 2)")]
        public decimal TipAmount { get; set; }
        [Column(TypeName = "decimal(10, 2)")]
        public decimal FinalAmount { get; set; }
        [Column(TypeName = "decimal(10, 2)")]
        public decimal PaidAmount { get; set; }

        // Navigation properties
        public Reservation Reservation { get; set; }
        public ServiceCharge ServiceCharge { get; set; }
        public Discount Discount { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; }
        public Refund Refund { get; set; }
        public ICollection<Payment> Payments { get; set; }
    }
}