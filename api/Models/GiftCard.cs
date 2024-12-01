using System.ComponentModel.DataAnnotations.Schema;
using api.Enums;

namespace api.Models
{
    public class GiftCard
    {
        public int Id { get; set; }
        public int MerchantId { get; set; }
        public string Code { get; set; } = string.Empty;
        [Column(TypeName = "decimal(18, 2)")]
        public decimal InitialBalance { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Balance { get; set; }
        public string Currency { get; set; } = string.Empty;
        public DateTime? ExpiresOn { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; }
        public Status Status { get; set; }

        public required Merchant Merchant { get; set; }
        public List<Payment> Payments { get; set; } = [];
    }
}