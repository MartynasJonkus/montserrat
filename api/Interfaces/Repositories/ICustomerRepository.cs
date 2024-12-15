using api.Enums;
using api.Models;

namespace api.Interfaces.Repositories
{
    public interface ICustomerRepository
    {
        Task<Customer?> GetCustomerByIdAsync(int id);
        Task<IEnumerable<Customer>> GetAllCustomersAsync(int merchantId, EmployeeType employeeType, int pageNumber, int pageSize);
        Task AddCustomerAsync(Customer customer);
        Task UpdateCustomerAsync(Customer customer);
        Task DeleteCustomerAsync(Customer customer);
    }
}