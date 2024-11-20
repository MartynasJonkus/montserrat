using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models.Structs;

namespace api.Models.Entities
{
    public class Merchant
    {
        public int Id { get; set; } // Primary Key
        public string Name { get; set; } = string.Empty;
        public string VAT { get; set; } = string.Empty;
        public Address Address { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Navigation Properties
        public List<Product> Products { get; set; } = new();
        public List<Employee> Employees { get; set; } = new();
        public List<Tax> Taxes { get; set; } = new();
        public List<Category> Categories { get; set; } = new();
    }
}