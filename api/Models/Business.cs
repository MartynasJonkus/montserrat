using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Business
    {
        public int BusinessID { get; set; } // Primary key
        public string BusinessName { get; set; } = string.Empty;
        public int OwnerID { get; set; } // Foreign key
        public string Address { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;

        // Navigation properties
        public ICollection<User> Users { get; set; }
    }
}