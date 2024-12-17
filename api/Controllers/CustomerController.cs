using api.Dtos.Customer;
using api.Enums;
using api.Interfaces.Services;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/customers")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;
        private readonly IReservationService _reservationService;
        public CustomerController(ICustomerService customerService, IReservationService reservationService)
        {
            _customerService = customerService;
            _reservationService = reservationService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCustomer(int id)
        {
            var customerDto = await _customerService.GetCustomerAsync(id);
            if (customerDto == null)
                return NotFound(new { message = "Customer not found" });

            return Ok(customerDto);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCustomers([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var merchantIdClaim = User.FindFirst("MerchantId");
            var employeeTypeClaim = User.FindFirst("EmployeeType");

            if (merchantIdClaim == null || employeeTypeClaim == null)
                return Unauthorized("MerchantId or EmployeeType is missing in the token.");

            if (!int.TryParse(merchantIdClaim.Value, out var merchantId))
                return Unauthorized("MerchantId is invalid.");

            if (!Enum.TryParse(employeeTypeClaim.Value, out EmployeeType employeeType))
                return Unauthorized("EmployeeType is invalid.");

            var customerDtos = await _customerService.GetAllCustomersAsync(merchantId, employeeType, pageNumber, pageSize);
            return Ok(customerDtos);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCustomer([FromBody] CreateUpdateCustomerDto createUpdateCustomerDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var merchantIdClaim = User.FindFirst("MerchantId");
            if (merchantIdClaim == null || !int.TryParse(merchantIdClaim.Value, out var merchantId))
            {
                return Unauthorized("MerchantId is missing or invalid in the token.");
            }

            var customerDto = await _customerService.CreateCustomerAsync(merchantId, createUpdateCustomerDto);
            return CreatedAtAction(nameof(GetCustomer), new { id = customerDto.Id }, customerDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCustomer(int id, [FromBody] CreateUpdateCustomerDto createUpdateCustomerDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updatedCustomer = await _customerService.UpdateCustomerAsync(id, createUpdateCustomerDto);
            if (updatedCustomer == null)
                return NotFound(new { message = "Product not found" });

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var isDeleted = await _customerService.DeleteCustomerAsync(id);
            if (!isDeleted)
                return NotFound(new { message = "Product not found" });

            return NoContent();
        }

        [HttpGet("{id}/reservations")]
        public async Task<IActionResult> GetCustomerReservations(int id)
        {
            var reservations = await _reservationService.GetReservationsByCustomerIdAsync(id);
            return Ok(reservations);
        }
    }
}