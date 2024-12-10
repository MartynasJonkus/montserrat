using api.Enums;

namespace api.Models
{
    public class Customer
    {
        public int Id { get; set; }
        public int MerchantId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
        public Status Status { get; set; }

        public required Merchant? Merchant { get; set; }
        public List<Reservation> Reservations { get; set; } = [];
    }
}