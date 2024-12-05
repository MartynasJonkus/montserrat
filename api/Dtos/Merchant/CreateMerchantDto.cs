using api.Models;

namespace api.Dtos.Merchant
{
    public class CreateMerchantDto
    {
        public string Name { get; set; } = string.Empty;
        public string VAT { get; set; } = string.Empty;
        public required Address Address { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
    }
}