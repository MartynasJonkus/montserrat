using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;

namespace api.Models.Entities
{
    public class Employee
    {
        public int Id { get; set; } // Primary Key
        public int MerchantId { get; set; } // Foreign Key
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public EmployeeType EmployeeType { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Navigation Properties
        public Merchant Merchant { get; set; }
        public List<Reservation> Reservations { get; set; } = new();
    }
}