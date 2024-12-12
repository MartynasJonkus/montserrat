using api.Enums;
using api.Models;

namespace api.Dtos.Merchant
{
    public class MerchantDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string VAT { get; set; } = string.Empty;
        public required Address Address { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public Status Status { get; set; }
    }
}