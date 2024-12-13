using api.Enums;

namespace api.Dtos.Reservation
{
    public class UpdateReservationDto
    {
        public int CustomerId { get; set; }
        public int ServiceId { get; set; }
        public int EmployeeId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public ReservationStatus Status { get; set; }
        public bool SendConfirmation { get; set; }
    }
}