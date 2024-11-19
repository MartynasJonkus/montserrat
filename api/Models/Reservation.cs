using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Models
{
    public class Reservation
    {
        public int ReservationID { get; set; } // Primary key
        public int? EmployeeID { get; set; } // Foreign key
        public int CustomerID { get; set; } // Foreign key
        public int? OrderID { get; set; } // Foreign key
        public DateTime ReservationTime { get; set; }
        public DateTime AppointmentTime { get; set; }
        public AppointmentStatus Status { get; set; }
        public bool NotificationSent { get; set; }

        // Navigation properties
        public User Employee { get; set; }
        public Customer Customer { get; set; }
        public Order Order { get; set; }
    }
}