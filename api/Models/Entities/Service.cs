using api.Models.Structs;

namespace api.Models.Entities
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
        public Price Price { get; set; }
        public int Duration { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; }

        public required Merchant Merchant { get; set; }
        public Employee? Employee { get; set; }
        public Category? Category { get; set; }
        public Discount? Discount { get; set; }
        public Tax? Tax { get; set; }
        public List<Reservation> Reservations { get; set; } = [];
    }
}