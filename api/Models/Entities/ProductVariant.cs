using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models.Entities
{
    public class ProductVariant
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string Title { get; set; } = string.Empty;
        [Column(TypeName = "decimal(18, 2)")]
        public int Quantity { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; }

        public required Product Product { get; set; }
        public List<OrderItem> OrderItems { get; set; } = [];
    }
}