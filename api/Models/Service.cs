using api.Enums;

namespace api.Models
{
    public class Service
    {
        public int Id { get; set; }
        public int MerchantId { get; set; }
        public int? EmployeeId { get; set; }
        public int? CategoryId { get; set; }
        public int? DiscountId { get; set; }
        public int? TaxId { get; set; }
        public string Title { get; set; } = string.Empty;
        public required Price Price { get; set; }
        public int DurationMins { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public Status Status { get; set; }

        public required Merchant Merchant { get; set; }
        public Employee? Employee { get; set; }
        public Category? Category { get; set; }
        public Discount? Discount { get; set; }
        public Tax? Tax { get; set; }
        public List<Reservation> Reservations { get; set; } = [];
    }
}