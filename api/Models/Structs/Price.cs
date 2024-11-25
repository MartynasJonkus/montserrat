using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models.Structs
{
    public struct Price(decimal amount, string currency)
    {
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Amount { get; set; } = amount;
        public string Currency { get; set; } = currency;
    }
}