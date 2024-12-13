using api.Enums;
using api.Models;

namespace api.Interfaces.Repositories
{
    public interface IEmployeeRepository
    {
        Task<Employee?> GetEmployeeByIdAsync(int id);
        Task<IEnumerable<Employee>> GetAllEmployeesAsync(int merchantId, EmployeeType employeeType, int pageNumber, int pageSize);
        Task AddEmployeeAsync(Employee employee);
        Task UpdateEmployeeAsync(Employee employee);
        Task DeleteEmployeeAsync(Employee employee);
        Task<Employee?> GetEmployeeByUsernameAsync(string username);
    }
}