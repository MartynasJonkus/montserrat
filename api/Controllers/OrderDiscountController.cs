using api.Dtos.Order;
using api.Enums;
using api.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/orderDiscounts")]
    public class OrderDiscountController : ControllerBase
    {
        private readonly IOrderDiscountService _orderDiscountService;
        public OrderDiscountController(IOrderDiscountService orderDiscountService)
        {
            _orderDiscountService = orderDiscountService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderDiscount(int id)
        {
            var orderDiscountDto = await _orderDiscountService.GetOrderDiscountAsync(id);
            if (orderDiscountDto == null)
                return NotFound(new { message = "Order discount not found" });

            return Ok(orderDiscountDto);
        }

        [HttpGet]
        public async Task<IActionResult> GetOrderDiscounts([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
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

            var orderDiscounts = await _orderDiscountService.GetAllOrderDiscountsAsync(merchantId, employeeType, pageNumber, pageSize);
            return Ok(orderDiscounts);
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrderDiscount([FromBody] CreateUpdateOrderDiscountDto createUpdateOrderDiscountDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var merchantIdClaim = User.FindFirst("MerchantId");
            if (merchantIdClaim == null || !int.TryParse(merchantIdClaim.Value, out var merchantId))
            {
                return Unauthorized("MerchantId is missing or invalid in the token.");
            }

            var orderDiscountDto = await _orderDiscountService.CreateOrderDiscountAsync(merchantId, createUpdateOrderDiscountDto);
            return CreatedAtAction(nameof(GetOrderDiscount), new { id = orderDiscountDto.Id }, orderDiscountDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrderDiscount(int id, [FromBody] CreateUpdateOrderDiscountDto createUpdateOrderDiscountDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var orderDiscount = await _orderDiscountService.UpdateOrderDiscountAsync(id, createUpdateOrderDiscountDto);
            if (orderDiscount == null)
                return NotFound(new { message = "Order discount not found" });

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderDiscount(int id)
        {
            var isDeleted = await _orderDiscountService.DeleteOrderDiscountAsync(id);
            if (!isDeleted)
                return NotFound(new { message = "Order discount not found" });

            return NoContent();
        }
        
    }
}