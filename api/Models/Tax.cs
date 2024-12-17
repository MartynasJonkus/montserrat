using api.Enums;

namespace api.Models
{
    public class Tax
    {
        public int Id { get; set; }
        public int MerchantId { get; set; }
        public string Title { get; set; } = string.Empty;
        public int Percentage { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public Status Status { get; set; }

        public required Merchant Merchant { get; set; }
        public List<Product> Products { get; set; } = [];
        public List<Service> Services { get; set; } = [];
    }
}