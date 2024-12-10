using api.Dtos.Customer;
using api.Enums;
using api.Interfaces.Repositories;
using api.Interfaces.Services;
using api.Models;

namespace api.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly ICustomerRepository _customerRepository;
        private readonly IMerchantRepository _merchantRepository;

        public CustomerService(ICustomerRepository customerRepository, IMerchantRepository merchantRepository)
        {
            _customerRepository = customerRepository;
            _merchantRepository = merchantRepository;
        }

        public async Task<Customer?> GetCustomerAsync(int id)
        {
            return await _customerRepository.GetByIdAsync(id);
        }

        public async Task<IEnumerable<Customer>> GetAllCustomersAsync()
        {
            return await _customerRepository.GetAllAsync();
        }

        public async Task<Customer> CreateCustomerAsync(CreateCustomerDto createCustomerDto)
        {
            
            var merchant = await _merchantRepository.GetByIdAsync(createCustomerDto.MerchantId);
            if (merchant == null)
            {
                throw new KeyNotFoundException("Merchant not found.");
            }

            var customer = new Customer
            {
                MerchantId = createCustomerDto.MerchantId,
                FirstName = createCustomerDto.FirstName,
                LastName = createCustomerDto.LastName,
                Phone = createCustomerDto.Phone,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Status = Status.active,
                Merchant = merchant
            };

            await _customerRepository.AddAsync(customer);
            return customer;
        }

        public async Task<Customer> UpdateCustomerAsync(int id, UpdateCustomerDto updatedCustomer)
        {
            var existingCustomer = await _customerRepository.GetByIdAsync(id);
            if (existingCustomer == null)
            {
                throw new KeyNotFoundException("Customer not found.");
            }

            var merchant = await _merchantRepository.GetByIdAsync(updatedCustomer.MerchantId);
            if (merchant == null)
            {
                throw new KeyNotFoundException("Merchant not found.");
            }

            existingCustomer.MerchantId = updatedCustomer.MerchantId;
            existingCustomer.FirstName = updatedCustomer.FirstName;
            existingCustomer.LastName = updatedCustomer.LastName;
            existingCustomer.Phone = updatedCustomer.Phone;
            existingCustomer.UpdatedAt = DateTime.UtcNow;
            existingCustomer.Status = updatedCustomer.Status;
            existingCustomer.Merchant = merchant;

            await _customerRepository.UpdateAsync(existingCustomer);
            return existingCustomer;        
        }
    }
}