using api.Enums;

namespace api.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public int ServiceId { get; set; }
        public int EmployeeId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public ReservationStatus Status { get; set; }
        public bool SendConfirmation { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; }

        public required Customer Customer { get; set; }
        public required Service Service { get; set; }
        public required Employee Employee { get; set; }
        public List<Payment> Payments { get; set; } = [];
    }
}