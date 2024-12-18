using api.Enums;
using api.Models;

namespace api.Dtos.Service
{
    public class CreateServiceDto
    {
        public int? EmployeeId { get; set; }
        public int? CategoryId { get; set; }
        public int? DiscountId { get; set; }
        public int? TaxId { get; set; }
        public string Title { get; set; } = string.Empty;
        public required Price Price { get; set; }
        public int DurationMins { get; set; }
        public Status Status { get; set; }
    }
}