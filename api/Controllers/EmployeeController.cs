using api.Dtos.Employee;
using api.Enums;
using api.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/employee")]
    [ApiController]
    public class EmployeeController : ControllerBase
       {
        private readonly IEmployeeService _employeeService;
        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployee(int id)
        {
            var employeeDto = await _employeeService.GetEmployeeAsync(id);
            if (employeeDto == null)
                return NotFound(new { message = "Employee not found" });

            return Ok(employeeDto);
        }

        [Authorize(Policy = "OwnerOnly")]
        [HttpGet]
        public async Task<IActionResult> GetAllEmployees([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var merchantIdClaim = User.FindFirst("MerchantId");
            var employeeTypeClaim = User.FindFirst("EmployeeType");

            if (merchantIdClaim == null || employeeTypeClaim == null)
                return Unauthorized("MerchantId or EmployeeType is missing in the token.");

            if (!int.TryParse(merchantIdClaim.Value, out var merchantId))
                return Unauthorized("MerchantId is invalid.");

            if (!Enum.TryParse(employeeTypeClaim.Value, out EmployeeType employeeType))
                return Unauthorized("EmployeeType is invalid.");
            
            var employeeDtos = await _employeeService.GetAllEmployeesAsync(merchantId, employeeType, pageNumber, pageSize);
            return Ok(employeeDtos);
        }

        [Authorize(Policy = "OwnerOnly")]
        [HttpPost]
        public async Task<IActionResult> CreateEmployee([FromBody] CreateUpdateEmployeeDto createUpdateEmployeeDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var merchantIdClaim = User.FindFirst("MerchantId");
            if (merchantIdClaim == null || !int.TryParse(merchantIdClaim.Value, out var merchantId))
            {
                return Unauthorized("MerchantId is missing or invalid in the token.");
            }

            var employeeDto = await _employeeService.CreateEmployeeAsync(merchantId, createUpdateEmployeeDto);
            return CreatedAtAction(nameof(GetEmployee), new { id = employeeDto.Id }, employeeDto);
        }

        [Authorize(Policy = "AdminOnly")]
        [HttpPost("admin/{merchantId}")]
        public async Task<IActionResult> CreateEmployeeAdmin([FromRoute] int merchantId, [FromBody] CreateUpdateEmployeeDto createUpdateEmployeeDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var employeeDto = await _employeeService.CreateEmployeeAsync(merchantId, createUpdateEmployeeDto);
            return CreatedAtAction(nameof(GetEmployee), new { id = employeeDto.Id }, employeeDto);
        }

        [Authorize(Policy = "OwnerOnly")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, [FromBody] CreateUpdateEmployeeDto createUpdateEmployeeDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updatedEmployee = await _employeeService.UpdateEmployeeAsync(id, createUpdateEmployeeDto);
            if (updatedEmployee == null)
                return NotFound(new { message = "Employee not found" });

            return Ok();
        }

        [Authorize(Policy = "OwnerOnly")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var isDeleted = await _employeeService.DeleteEmployeeAsync(id);
            if (!isDeleted)
                return NotFound(new { message = "Product not found" });

            return NoContent();
        }
    }
}