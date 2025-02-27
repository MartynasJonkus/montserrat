using api.Dtos.Order;
using api.Enums;
using api.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/orders")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IReceiptService _receiptService;

        public OrderController(IOrderService orderService, IReceiptService receiptService)
        {
            _orderService = orderService;
            _receiptService = receiptService;
        }

        [HttpGet("{orderId}")]
        public async Task<IActionResult> GetOrder([FromRoute] int orderId)
        {
            var order = await _orderService.GetOrderByIdAsync(orderId);
            if (order == null) return NotFound();
            return Ok(order);
        }

        [HttpGet]
        public async Task<IActionResult> GetOrders([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10, [FromQuery] OrderStatus? orderStatus = null, [FromQuery] string sortOrder = "desc")
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

            var orders = await _orderService.GetAllOrdersAsync(merchantId, employeeType, orderStatus, sortOrder, pageNumber, pageSize);
            return Ok(orders);
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderDto createOrderDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var merchantIdClaim = User.FindFirst("MerchantId");
            if (merchantIdClaim == null || !int.TryParse(merchantIdClaim.Value, out var merchantId))
            {
                return Unauthorized("MerchantId is missing or invalid in the token.");
            }

            var createdOrder = await _orderService.CreateOrderAsync(merchantId, createOrderDto);
            if (createdOrder == null) return BadRequest("Invalid order data.");
            return CreatedAtAction(nameof(GetOrder), new { orderId = createdOrder.Id }, createdOrder);
        }

        [HttpPut("{orderId}")]
        public async Task<IActionResult> UpdateOrder([FromRoute] int orderId, [FromBody] UpdateOrderDto updateOrderDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updatedOrder = await _orderService.UpdateOrderAsync(orderId, updateOrderDto);
            if (updatedOrder == null) return NotFound();

            return Ok(updatedOrder);
        }

        [HttpDelete("{orderId}")]
        public async Task<IActionResult> DeleteOrder([FromRoute] int orderId)
        {
            var success = await _orderService.DeleteOrderAsync(orderId);
            if (!success) return NotFound();
            return NoContent();
        }

        [HttpGet("{orderId}/receipt")]
        public async Task<IActionResult> GetReceiptByOrderId(int orderId)
        {
            var merchantIdClaim = User.FindFirst("MerchantId");
            if (merchantIdClaim == null || !int.TryParse(merchantIdClaim.Value, out var merchantId))
            {
                return Unauthorized("MerchantId is missing or invalid in the token.");
            }

            var receipt = await _receiptService.GetReceiptByOrderIdAsync(merchantId, orderId);
            if (receipt == null)
                return NotFound(new { message = "Receipt not found for the order" });

            return Ok(receipt);
        }

        [HttpPut("{orderId}/discount")]
        public async Task<IActionResult> UpdateOrderDiscount([FromRoute] int orderId, [FromBody] int? orderDiscountId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var orderDto = await _orderService.UpdateOrderDiscount(orderId, orderDiscountId);
            if (orderDto == null)
                return NotFound(new { message = "Receipt not found for the order" });

            return Ok(orderDto);
        }
    }
}