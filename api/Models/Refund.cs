namespace api.Models
{
    public class Refund
    {
        public int Id { get; set; }
        public int MerchantId { get; set; }
        public int PaymentId { get; set; }
        public required Price RefundAmount { get; set; }
        public string Reason { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public required Merchant Merchant { get; set; }
        public required Payment Payment { get; set; }
    }
}