using System.ComponentModel.DataAnnotations.Schema;
using api.Enums;

namespace api.Models
{
    public class Price
    {
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Amount { get; set; } = 0;
        public Currency Currency { get; set; }
    }
}
