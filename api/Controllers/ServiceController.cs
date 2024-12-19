using api.Dtos.Service;
using api.Enums;
using api.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace api.Controllers
{
    [ApiController]
    [Route("api/services")]
    public class ServiceController : ControllerBase
    {
        private readonly IServiceService _serviceService;

        public ServiceController(IServiceService serviceService)
        {
            _serviceService = serviceService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateService(CreateServiceDto createServiceDto)
        {
            var merchantIdClaim = User.FindFirst("MerchantId");
            if (merchantIdClaim == null || !int.TryParse(merchantIdClaim.Value, out var merchantId))
            {
                return Unauthorized("MerchantId is missing or invalid in the token.");
            }

            var service = await _serviceService.CreateServiceAsync(merchantId, createServiceDto);
            return CreatedAtAction(nameof(GetService), new { id = service.Id }, service);
        }

        [HttpGet]
        public async Task<IActionResult> GetServices([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10, [FromQuery] string? category = null, [FromQuery] int limit = 10)
        {
            if (pageNumber <= 0 || pageSize <= 0)
                return BadRequest("Page and pageSize must be greater than 0.");

            var merchantIdClaim = User.FindFirst("MerchantId");
            var employeeTypeClaim = User.FindFirst("EmployeeType");

            if (merchantIdClaim == null || employeeTypeClaim == null)
                return Unauthorized("MerchantId or EmployeeType is missing in the token.");

            if (!int.TryParse(merchantIdClaim.Value, out var merchantId))
                return Unauthorized("MerchantId is invalid.");

            if (!Enum.TryParse(employeeTypeClaim.Value, out EmployeeType employeeType))
                return Unauthorized("EmployeeType is invalid.");

            var services = await _serviceService.GetServicesAsync(merchantId, employeeType, category, pageNumber, pageSize);
            return Ok(services);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetService(int id)
        {
            var service = await _serviceService.GetServiceAsync(id);
            if (service == null)
                return NotFound();

            return Ok(service);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateService(int id, UpdateServiceDto updateServiceDto)
        {
            var service = await _serviceService.UpdateServiceAsync(id, updateServiceDto);
            if (service == null)
                return NotFound();

            return Ok(service);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteService(int id)
        {
            var isDeleted = await _serviceService.DeleteServiceAsync(id);
            if (!isDeleted)
                return NotFound();

            return NoContent();
        }

        [HttpGet("{serviceId}/available-times")]
        public async Task<IActionResult> CheckAvailableTimes(int serviceId, [FromQuery] DateTime date)
        {
            var availableTimes = await _serviceService.CheckAvailableTimesAsync(serviceId, date);
            return Ok(availableTimes);
        }
    }
}