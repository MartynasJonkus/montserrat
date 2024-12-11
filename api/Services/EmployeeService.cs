using api.Dtos.Employee;
using api.Enums;
using api.Interfaces.Repositories;
using api.Interfaces.Services;
using api.Models;
using AutoMapper;

namespace api.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IMerchantRepository _merchantRepository;
        private readonly IMapper _mapper;

        public EmployeeService(IEmployeeRepository employeeRepository, IMerchantRepository merchantRepository, IMapper mapper)
        {
            _employeeRepository = employeeRepository;
            _merchantRepository = merchantRepository;
            _mapper = mapper;
        }

        public async Task<Employee?> GetEmployeeAsync(int id)
        {
            return await _employeeRepository.GetByIdAsync(id);
        }

        public async Task<IEnumerable<Employee>> GetAllEmployeesAsync()
        {
            return await _employeeRepository.GetAllAsync();
        }

        public async Task<Employee> CreateEmployeeAsync(CreateEmployeeDto createEmployeeDto)
        {
            var merchant = await _merchantRepository.GetByIdAsync(createEmployeeDto.MerchantId);
            if (merchant == null)
            {
                throw new KeyNotFoundException("Merchant not found.");
            }

            var employee = _mapper.Map<Employee>(createEmployeeDto);
            employee.Merchant = merchant;

            await _employeeRepository.AddAsync(employee);
            return employee;
        }

        public async Task<Employee> UpdateEmployeeAsync(int id, UpdateEmployeeDto updatedEmployee)
        {
            var existingEmployee = await _employeeRepository.GetByIdAsync(id);
            if (existingEmployee == null)
            {
                throw new KeyNotFoundException("Employee not found.");
            }

            var merchant = await _merchantRepository.GetByIdAsync(updatedEmployee.MerchantId);
            if (merchant == null)
            {
                throw new KeyNotFoundException("Merchant not found.");
            }

            _mapper.Map(updatedEmployee, existingEmployee);
            existingEmployee.Merchant = merchant;

            await _employeeRepository.UpdateAsync(existingEmployee);
            return existingEmployee;
        }
    }
}
