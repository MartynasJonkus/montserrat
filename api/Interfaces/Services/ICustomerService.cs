using api.Dtos.Customer;
using api.Models;

namespace api.Interfaces.Services
{
    public interface ICustomerService
    {
        Task<Customer?> GetCustomerAsync(int id);
        Task<IEnumerable<Customer>> GetAllCustomersAsync();
        Task<Customer> CreateCustomerAsync(CreateUpdateCustomerDto createCustomerDto);
        Task<Customer> UpdateCustomerAsync(int id, CreateUpdateCustomerDto updatedCustomer);
    }
}