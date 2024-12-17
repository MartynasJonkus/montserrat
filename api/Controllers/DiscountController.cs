using api.Dtos.Discount;
using api.Enums;
using api.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/discounts")]
    public class DiscountController : ControllerBase
       {
        private readonly IDiscountService _discountService;
        public DiscountController(IDiscountService discountService)
        {
            _discountService = discountService;
        }
        [HttpPost]
        public async Task<IActionResult> CreateDiscount([FromBody] CreateUpdateDiscountDto createUpdateDiscountDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var merchantIdClaim = User.FindFirst("MerchantId");
            if (merchantIdClaim == null || !int.TryParse(merchantIdClaim.Value, out var merchantId))
            {
                return Unauthorized("MerchantId is missing or invalid in the token.");
            }

            var discountDto = await _discountService.CreateDiscountAsync(merchantId, createUpdateDiscountDto);
            return Created("", discountDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDiscount(int id, [FromBody] CreateUpdateDiscountDto createUpdateDiscountDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updatedDiscount = await _discountService.UpdateDiscountAsync(id, createUpdateDiscountDto);
            if (updatedDiscount == null)
                return NotFound(new { message = "Discount not found" });
            
            return Ok();
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDiscount(int id)
        {
            var discountDto = await _discountService.GetDiscountByIdAsync(id);
            if (discountDto == null)
                return NotFound(new { message = "Discount not found" });

            return Ok(discountDto);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllDiscounts([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var merchantIdClaim = User.FindFirst("MerchantId");
            var employeeTypeClaim = User.FindFirst("EmployeeType");

            if (merchantIdClaim == null || employeeTypeClaim == null)
                return Unauthorized("MerchantId or EmployeeType is missing in the token.");

            if (!int.TryParse(merchantIdClaim.Value, out var merchantId))
                return Unauthorized("MerchantId is invalid.");

            if (!Enum.TryParse(employeeTypeClaim.Value, out EmployeeType employeeType))
                return Unauthorized("EmployeeType is invalid.");
            
            var discountDtos = await _discountService.GetAllDiscountsAsync(merchantId, employeeType, pageNumber, pageSize);
            return Ok(discountDtos);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDiscount(int id)
        {
            var isDeleted = await _discountService.DeleteDiscountAsync(id);
            if (!isDeleted)
                return NotFound(new { message = "Discount not found" });

            return NoContent();
        }
    }
}