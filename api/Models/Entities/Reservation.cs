using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;

namespace api.Models.Entities
{
    public class Reservation
    {
        public int Id { get; set; } // Primary Key
        public int CustomerId { get; set; } // Foreign Key
        public int ServiceId { get; set; } // Foreign Key
        public int EmployeeId { get; set; } // Foreign Key
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public ReservationStatus Status { get; set; }
        public bool SendConfirmation { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Navigation Properties
        public Customer Customer { get; set; }
        public Service Service { get; set; }
        public Employee Employee { get; set; }
        public List<Payment> Payments { get; set; } = new();
    }
}