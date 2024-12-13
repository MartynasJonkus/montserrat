using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using api.Dtos.Service;
using api.Interfaces.Services;
using api.Models;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<IActionResult> CreateService([FromBody] CreateServiceDto createServiceDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var service = await _serviceService.CreateServiceAsync(createServiceDto);
            return CreatedAtAction(nameof(GetService), new { serviceId = service.Id }, service);
        }

        [HttpGet]
        public async Task<IActionResult> GetServices([FromQuery] ServiceDto serviceDto)
        {
            var services = await _serviceService.GetServicesAsync(serviceDto);
            return Ok(services);
        }

        [HttpGet("{serviceId}")]
        public async Task<IActionResult> GetService([FromRoute] int serviceId)
        {
            var service = await _serviceService.GetServiceAsync(serviceId);
            if (service == null)
                return NotFound(new { message = "Service not found" });

            return Ok(service);
        }

        [HttpPut("{serviceId}")]
        public async Task<IActionResult> UpdateService([FromRoute] int serviceId, [FromBody] UpdateServiceDto updateServiceDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updatedService = await _serviceService.UpdateServiceAsync(serviceId, updateServiceDto);
            if (updatedService == null)
                return NotFound(new { message = "Service not found" });

            return Ok(updatedService);
        }

        [HttpDelete("{serviceId}")]
        public async Task<IActionResult> DeleteService([FromRoute] int serviceId)
        {
            var deleted = await _serviceService.DeleteServiceAsync(serviceId);
            if (!deleted)
                return NotFound(new { message = "Service not found" });

            return NoContent();
        }

        [HttpGet("{serviceId}/available-times")]
        public async Task<IActionResult> CheckAvailableTimes([FromRoute] int serviceId, [FromQuery] DateTime date)
        {
            var availableTimes = await _serviceService.CheckAvailableTimesAsync(serviceId, date);
            if (availableTimes == null)
                return NotFound(new { message = "Service not found or no available times" });

            return Ok(availableTimes);
        }
    }
}