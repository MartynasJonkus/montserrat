using api.Enums;

namespace api.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int MerchantId { get; set; }
        public int? OrderDiscountId { get; set; }
        public OrderStatus Status { get; set; }
        public required Price TotalAmount { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public required Merchant Merchant { get; set; }
        public OrderDiscount? OrderDiscount { get; set; }
        public Refund? Refund { get; set; }
        public List<OrderItem> OrderItems { get; set; } = [];
        public List<Payment> Payments { get; set; } = [];
    }
}