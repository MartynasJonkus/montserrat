using api.Models;

namespace api.Interfaces.Repositories
{
    public interface IEmployeeRepository
    {
        Task<Employee?> GetByIdAsync(int id);
        Task<Employee?> GetEmployeeByUsernameAsync(string username);
        Task<IEnumerable<Employee>> GetAllAsync();
        Task AddAsync(Employee employee);
        Task UpdateAsync(Employee employee);
    }
}