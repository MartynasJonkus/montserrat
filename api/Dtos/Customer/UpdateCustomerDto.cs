using api.Enums;

namespace api.Dtos.Customer
{
    public class UpdateCustomerDto
    {
        public int MerchantId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;      
        public Status Status { get; set; }
    }
}