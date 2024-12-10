using api.Dtos.Employee;
using api.Enums;
using api.Interfaces.Repositories;
using api.Interfaces.Services;
using api.Models;

namespace api.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IMerchantRepository _merchantRepository;

        public EmployeeService(IEmployeeRepository employeeRepository, IMerchantRepository merchantRepository)
        {
            _employeeRepository = employeeRepository;
            _merchantRepository = merchantRepository;
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
            // Fetch the Merchant
            var merchant = await _merchantRepository.GetByIdAsync(createEmployeeDto.MerchantId);
            if (merchant == null)
            {
                throw new KeyNotFoundException("Merchant not found.");
            }

            var employee = new Employee
            {
                MerchantId = createEmployeeDto.MerchantId,
                FirstName = createEmployeeDto.FirstName,
                LastName = createEmployeeDto.LastName,
                EmployeeType = createEmployeeDto.EmployeeType,
                Username = createEmployeeDto.Username,
                Password = createEmployeeDto.Password,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Status = Status.active,
                Merchant = merchant
            };

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

            // Fetch the Merchant
            var merchant = await _merchantRepository.GetByIdAsync(updatedEmployee.MerchantId);
            if (merchant == null)
            {
                throw new KeyNotFoundException("Merchant not found.");
            }

            existingEmployee.MerchantId = updatedEmployee.MerchantId;
            existingEmployee.FirstName = updatedEmployee.FirstName;
            existingEmployee.LastName = updatedEmployee.LastName;
            existingEmployee.EmployeeType = updatedEmployee.EmployeeType;
            existingEmployee.Username = updatedEmployee.Username;
            existingEmployee.Password = updatedEmployee.Password;
            existingEmployee.UpdatedAt = DateTime.UtcNow;
            existingEmployee.Status = updatedEmployee.Status;
            existingEmployee.Merchant = merchant;

            await _employeeRepository.UpdateAsync(existingEmployee);
            return existingEmployee;
        }
    }
}
