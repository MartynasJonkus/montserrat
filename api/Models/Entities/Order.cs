using api.Enums;
using api.Models.Structs;

namespace api.Models.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public int MerchantId { get; set; }
        public int? OrderDiscountId { get; set; }
        public OrderStatus Status { get; set; }
        public Price TotalAmount { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; }

        public required Merchant Merchant { get; set; }
        public OrderDiscount? OrderDiscount { get; set; }
        public List<OrderItem> OrderItems { get; set; } = [];
        public List<Payment> Payments { get; set; } = [];
    }
}