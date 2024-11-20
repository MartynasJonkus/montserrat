using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models.Entities
{
    public class Category
    {
        public int Id { get; set; } // Primary Key
        public int MerchantId { get; set; } // Foreign Key
        public string Title { get; set; } = string.Empty;

        // Navigation Properties
        public Product Product { get; set; }
        public Service Service { get; set; }
    }
}