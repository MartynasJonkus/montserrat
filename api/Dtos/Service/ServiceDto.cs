using api.Models;

namespace api.Dtos.Service
{
    public class ServiceDto
    {
        public int Id { get; set; }
        public int MerchantId { get; set; }
        public string Title { get; set; } = string.Empty;
        public int CategoryId { get; set; }
        public required Price Price { get; set; }
        public int DiscountId { get; set; }
        public int TaxId { get; set; }
        public int DurationMins { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}