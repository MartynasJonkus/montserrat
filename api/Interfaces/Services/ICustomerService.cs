using api.Dtos.Customer;
using api.Enums;
using api.Models;

namespace api.Interfaces.Services
{
    public interface ICustomerService
    {
        Task<CustomerDto?> GetCustomerAsync(int id);
        Task<IEnumerable<CustomerDto>> GetAllCustomersAsync(int merchantId, EmployeeType employeeType, int pageNumber, int pageSize);
        Task<CustomerDto> CreateCustomerAsync(int merchantId, CreateUpdateCustomerDto createCustomerDto);
        Task<Customer> UpdateCustomerAsync(int id, CreateUpdateCustomerDto updatedCustomer);
        Task<bool> DeleteCustomerAsync(int id);
    }
}