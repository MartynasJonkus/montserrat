namespace api.Models
{
    public class Customer
    {
        public int Id { get; set; }
        public int MerchantId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;

        public required Merchant Merchant { get; set; }
        public List<Reservation> Reservations { get; set; } = [];
    }
}