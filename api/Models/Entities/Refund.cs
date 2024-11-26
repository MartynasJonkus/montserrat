using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models.Entities
{
    public class Refund
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        [Column(TypeName = "decimal(18, 2)")]
        public decimal TotalAmount { get; set; }
        public string Reason { get; set; } = string.Empty;

        public required Order Order { get; set; }
    }
}