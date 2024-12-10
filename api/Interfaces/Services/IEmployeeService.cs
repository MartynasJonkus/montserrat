using api.Dtos.Employee;
using api.Models;

namespace api.Interfaces.Services
{
    public interface IEmployeeService
    {
        Task<Employee?> GetEmployeeAsync(int id);
        Task<IEnumerable<Employee>> GetAllEmployeesAsync();
        Task<Employee> CreateEmployeeAsync(CreateEmployeeDto createEmployeeDto);
        Task<Employee> UpdateEmployeeAsync(int id, UpdateEmployeeDto updatedEmployee);
    }
}