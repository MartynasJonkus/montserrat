using api.Enums;

namespace api.Models.Entities
{
    public class Employee
    {
        public int Id { get; set; }
        public int MerchantId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public EmployeeType EmployeeType { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public required Merchant Merchant { get; set; }
        public List<Reservation> Reservations { get; set; } = [];
        public List<Service> Services { get; set; } = [];
    }
}