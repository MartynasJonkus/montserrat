using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models.Entities
{
    public class GiftCard
    {
        public int Id { get; set; } // Primary Key
        public int MerchantId { get; set; } // Foreign Key
        public string Code { get; set; } = string.Empty;
        [Column(TypeName = "decimal(18, 2)")]
        public decimal InitialBalance { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Balance { get; set; }
        public string Currency { get; set; } = string.Empty;
        public Date? ExpiresOn { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Navigation Property
        public Payment Payment { get; set; }
    }
}