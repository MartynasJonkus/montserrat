using api.Dtos.Customer;
using api.Enums;
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

        public async Task<CustomerDto?> GetCustomerAsync(int id)
        {
            var customer = await _customerRepository.GetCustomerByIdAsync(id);
            return _mapper.Map<CustomerDto>(customer);
        }

        public async Task<IEnumerable<CustomerDto>> GetAllCustomersAsync(int merchantId, EmployeeType employeeType, int pageNumber, int pageSize)
        {
            var customers = await _customerRepository.GetAllCustomersAsync(merchantId, employeeType, pageNumber, pageSize);
            return _mapper.Map<IEnumerable<CustomerDto>>(customers);
        }

        public async Task<CustomerDto> CreateCustomerAsync(int merchantId, CreateUpdateCustomerDto createUpdateCustomerDto)
        {
            var customer = _mapper.Map<Customer>(createUpdateCustomerDto);
            customer.MerchantId = merchantId;

            await _customerRepository.AddCustomerAsync(customer);
            return _mapper.Map<CustomerDto>(customer);
        }

        public async Task<Customer> UpdateCustomerAsync(int id, CreateUpdateCustomerDto updatedCustomer)
        {
            var existingCustomer = await _customerRepository.GetCustomerByIdAsync(id);
            if (existingCustomer == null)
                throw new KeyNotFoundException("Customer not found.");

            _mapper.Map(updatedCustomer, existingCustomer);
            await _customerRepository.UpdateCustomerAsync(existingCustomer);
            return existingCustomer;        
        }

        public async Task<bool> DeleteCustomerAsync(int id)
        {
            var existingCustomer = await _customerRepository.GetCustomerByIdAsync(id);
            if (existingCustomer == null)
                return false;

            await _customerRepository.DeleteCustomerAsync(existingCustomer);
            return true;
        }
    }
}