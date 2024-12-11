using api.Enums;
using api.Models;

namespace api.Dtos.Employee
{
    public class UpdateEmployeeDto
    {
        public int MerchantId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public EmployeeType EmployeeType { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;    
        public Status Status { get; set; }
    }
}