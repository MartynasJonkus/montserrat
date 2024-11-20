using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models.Entities
{
    public class Customer
    {
        public int Id { get; set; } // Primary Key
        public int MerchantId { get; set; } // Foreign Key
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;

        // Navigation Property
        public Merchant Merchant { get; set; } = null!;
        public List<Reservation> Reservations { get; set; } = new();
    }
}