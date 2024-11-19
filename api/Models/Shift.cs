using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Shift
    {
        public int ShiftID { get; set; } // Primary key
        public int EmployeeID { get; set; } // Foreign key
        public DateTime Date { get; set; }
        public Time StartTime { get; set; }
        public Time EndTime { get; set; }

        // Navigation property
        public User User { get; set; }
    }
}