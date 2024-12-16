using api.Enums;

namespace api.Dtos.Category
{
    public class CreateUpdateCategoryDto
    {
        public string Title { get; set; } = string.Empty;
        public Status Status { get; set; }
    }
}