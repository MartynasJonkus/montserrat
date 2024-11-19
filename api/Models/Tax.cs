using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Models
{
    public class Tax
    {
        public int TaxID { get; set; } // Primary key
        public string Name { get; set; } = string.Empty;
        public TaxType Type { get; set; } = string.Empty;
        [Column(TypeName = "decimal(5, 2)")]
        public decimal Value { get; set; }
        public bool IsPercentage { get; set; }
        public DateTime LastUpdated { get; set; }

        // Navigation property
        public ICollection<ItemTax> ItemTaxes { get; set; }

    }
}