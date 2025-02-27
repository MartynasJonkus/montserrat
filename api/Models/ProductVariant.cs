using System.ComponentModel.DataAnnotations.Schema;
using api.Enums;

namespace api.Models
{
    public class ProductVariant
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string Title { get; set; } = string.Empty;
        [Column(TypeName = "decimal(18, 2)")]
        public decimal AdditionalPrice { get; set; }
        public int Quantity { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public Status Status { get; set; }

        public required Product Product { get; set; }
        public List<OrderItem> OrderItems { get; set; } = [];
    }
}