using System.ComponentModel.DataAnnotations.Schema;
using api.Enums;

namespace api.Models.Entities
{
    public class Discount
    {
        public int Id { get; set; }
        public int MerchantId { get; set; }
        public string Title { get; set; } = string.Empty;
        [Column(TypeName = "decimal(5, 2)")]
        public decimal Percentage { get; set; }
        public DateTime ExpiresOn { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; }
        public Status Status { get; set; }

        public required Merchant Merchant { get; set; }
        public List<Product> Products { get; set; } = [];
        public List<Service> Services { get; set; } = [];
    }
}