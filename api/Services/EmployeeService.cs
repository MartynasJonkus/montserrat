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

        public async Task<EmployeeDto?> GetEmployeeAsync(int id)
        {
            var employee = await _employeeRepository.GetEmployeeByIdAsync(id);
            return _mapper.Map<EmployeeDto>(employee);
        }

        public async Task<IEnumerable<EmployeeDto>> GetAllEmployeesAsync(int merchantId, EmployeeType employeeType, int pageNumber, int pageSize)
        {
            var employees = await _employeeRepository.GetAllEmployeesAsync(merchantId, employeeType, pageNumber, pageSize);
            return _mapper.Map<IEnumerable<EmployeeDto>>(employees);
        }

        public async Task<EmployeeDto> CreateEmployeeAsync(int merchantId, CreateUpdateEmployeeDto createEmployeeDto)
        {
            var employee = _mapper.Map<Employee>(createEmployeeDto);
            employee.MerchantId = merchantId;

            await _employeeRepository.AddEmployeeAsync(employee);
            return _mapper.Map<EmployeeDto>(employee);
        }

        public async Task<Employee> UpdateEmployeeAsync(int id, CreateUpdateEmployeeDto updatedEmployee)
        {
            var existingEmployee = await _employeeRepository.GetEmployeeByIdAsync(id);
            if (existingEmployee == null)
                throw new KeyNotFoundException("Employee not found.");

            _mapper.Map(updatedEmployee, existingEmployee);
            existingEmployee.UpdatedAt = DateTime.UtcNow;
            
            await _employeeRepository.UpdateEmployeeAsync(existingEmployee);
            return existingEmployee;
        }

        public async Task<bool> DeleteEmployeeAsync(int id)
        {
            var existingEmployee = await _employeeRepository.GetEmployeeByIdAsync(id);
            if (existingEmployee == null)
                return false;

            await _employeeRepository.DeleteEmployeeAsync(existingEmployee);
            return true;
        }
    }
}
