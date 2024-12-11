using api.Dtos.Customer;
using api.Interfaces.Repositories;
using api.Interfaces.Services;
using api.Models;
using AutoMapper;

namespace api.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly ICustomerRepository _customerRepository;
        private readonly IMerchantRepository _merchantRepository;
        private readonly IMapper _mapper;

        public CustomerService(ICustomerRepository customerRepository, IMerchantRepository merchantRepository, IMapper mapper)
        {
            _customerRepository = customerRepository;
            _merchantRepository = merchantRepository;
            _mapper = mapper;
        }

        public async Task<Customer?> GetCustomerAsync(int id)
        {
            return await _customerRepository.GetByIdAsync(id);
        }

        public async Task<IEnumerable<Customer>> GetAllCustomersAsync()
        {
            return await _customerRepository.GetAllAsync();
        }

        public async Task<Customer> CreateCustomerAsync(CreateUpdateCustomerDto createUpdateCustomerDto)
        {
            
            var merchant = await _merchantRepository.GetByIdAsync(createUpdateCustomerDto.MerchantId);
            if (merchant == null)
            {
                throw new KeyNotFoundException("Merchant not found.");
            }

            var customer = _mapper.Map<Customer>(createUpdateCustomerDto);
            customer.Merchant = merchant;

            await _customerRepository.AddAsync(customer);
            return customer;
        }

        public async Task<Customer> UpdateCustomerAsync(int id, CreateUpdateCustomerDto updatedCustomer)
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

            _mapper.Map(updatedCustomer, existingCustomer);
            existingCustomer.Merchant = merchant;

            await _customerRepository.UpdateAsync(existingCustomer);
            return existingCustomer;        
        }
    }
}