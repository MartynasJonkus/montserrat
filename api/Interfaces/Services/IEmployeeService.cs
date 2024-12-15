using api.Dtos.Employee;
using api.Enums;
using api.Models;

namespace api.Interfaces.Services
{
    public interface IEmployeeService
    {
        Task<EmployeeDto?> GetEmployeeAsync(int id);
        Task<IEnumerable<EmployeeDto>> GetAllEmployeesAsync(int merchantId, EmployeeType employeeType, int pageNumber, int pageSize);
        Task<EmployeeDto> CreateEmployeeAsync(int merchantId, CreateUpdateEmployeeDto createEmployeeDto);
        Task<Employee> UpdateEmployeeAsync(int id, CreateUpdateEmployeeDto updatedEmployee);
        Task<bool> DeleteEmployeeAsync(int id);
    }
}