namespace api.Models
{
    public class OrderDiscount
    {
        public int Id { get; set; }
        public int MerchantId { get; set; }
        public string Title { get; set; } = string.Empty;
        public int Percentage { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public required Merchant Merchant { get; set; }
    }
}