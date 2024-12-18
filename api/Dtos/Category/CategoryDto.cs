using api.Enums;

namespace api.Dtos.Category
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public int MerchantId { get; set; }
        public string Title { get; set; } = string.Empty;
        public Status Status { get; set; }
    }
}