using api.Enums;

namespace api.Dtos.Discount
{
    public class CreateUpdateDiscountDto
    {
        public string Title { get; set; } = string.Empty;
        public decimal Percentage { get; set; }
        public DateTime ExpiresOn { get; set; }
        public Status Status { get; set; }
    }
}