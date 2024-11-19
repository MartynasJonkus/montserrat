using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;

namespace api.Models
{
    public class User
    {
        public int UserID { get; set; } // Primary key
        public string Username { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public Roles Role { get; set; }
        public EmployeeStatus Employee { get; set; }
        public DateTime DateOfEmployment { get; set; }
        public DateTime LastUpdated { get; set; }
        public int BusinessId { get; set; } // Foreign key

        // Navigation properties
        public Business Business { get; set; }
        public ICollection<Shift> Shifts { get; set; }
        public ICollection<Reservation> Reservations { get; set; }
        public ICollection<Service> Services { get; set; }
        public ICollection<Order> Orders { get; set; }



        public bool IsEmailValid()
        {
            // Add email validation logic here
            return !string.IsNullOrEmpty(Email) && Email.Contains("@");
        }

        public bool IsPhoneNumberValid()
        {
            // Add phone number validation logic here
            return !string.IsNullOrEmpty(PhoneNumber) && PhoneNumber.Length == 12; // 12 is the length of a phone number with the country code '+370'
        }
    }
}