using api.Dtos.Employee;
using api.Interfaces.Services;
using api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/employee")]
    [ApiController]
    public class EmployeeController : ControllerBase
       {
        private readonly IEmployeeService _employeeService;
        private readonly IMapper _mapper;
        public EmployeeController(IMapper mapper, IEmployeeService employeeService)
        {
            _mapper = mapper;
            _employeeService = employeeService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployee(int id)
        {
            var employee = await _employeeService.GetEmployeeAsync(id);
            if (employee == null)
                return NotFound(new { message = "Employee not found" });

            var employeeDto = _mapper.Map<EmployeeDto>(employee);
            return Ok(employeeDto);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            var employees = await _employeeService.GetAllEmployeesAsync();
            var employeesDtos = _mapper.Map<IEnumerable<EmployeeDto>>(employees);
            return Ok(employeesDtos);
        }

        [HttpPost]
        public async Task<IActionResult> CreateEmployee([FromBody] CreateEmployeeDto createEmployeeDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var createdEmployee = await _employeeService.CreateEmployeeAsync(createEmployeeDto);
            var employeeDto = _mapper.Map<EmployeeDto>(createdEmployee);
            return CreatedAtAction(nameof(GetEmployee), new { id = createdEmployee.Id }, employeeDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, [FromBody] UpdateEmployeeDto updateEmployeeDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var employee = await _employeeService.UpdateEmployeeAsync(id, updateEmployeeDto);
                var employeeDto = _mapper.Map<EmployeeDto>(employee);
                return Ok(employeeDto);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }
    }
}