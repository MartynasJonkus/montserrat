using api.Enums;

namespace api.Models.Entities
{
    public class Category
    {
        public int Id { get; set; }
        public int MerchantId { get; set; }
        public string Title { get; set; } = string.Empty;
        public Status Status { get; set; }

        public required Merchant Merchant { get; set; }
        public List<Product> Products { get; set; } = [];
        public List<Service> Services { get; set; } = [];
    }
}