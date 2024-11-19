using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class ItemGroup
    {
        public int GroupID { get; set; } // Primary key
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        // Navigation properties
        public ICollection<Item> Items { get; set; }
        public ICollection<GroupDiscount> GroupDiscounts { get; set; }
    }
}