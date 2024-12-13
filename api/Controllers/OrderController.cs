using api.Dtos.Order;
using api.Interfaces.Services;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/orders")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
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

        [HttpGet("{orderId}")]
        public async Task<IActionResult> GetOrder([FromRoute] int orderId)
        {
            var order = await _orderService.GetOrderByIdAsync(orderId);
            if (order == null) return NotFound();
            return Ok(order);
        }

        [HttpPut("{orderId}")]
        public async Task<IActionResult> UpdateOrder([FromRoute] int orderId, [FromBody] Order orderUpdate)
        {
            var updatedOrder = await _orderService.UpdateOrderAsync(orderId, orderUpdate);
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

        [HttpPatch("{orderId}/cancel")]
        public async Task<IActionResult> CancelOrder([FromRoute] int orderId)
        {
            var canceledOrder = await _orderService.CancelOrderAsync(orderId);
            if (canceledOrder == null) return NotFound();
            return Ok(canceledOrder);
        }

        [HttpPost("{orderId}/discount")]
        public async Task<IActionResult> ApplyDiscount([FromRoute] int orderId, [FromQuery] int discountId)
        {
            var updatedOrder = await _orderService.ApplyDiscountAsync(orderId, discountId);
            if (updatedOrder == null) return BadRequest("Invalid order or discount.");
            return Ok(updatedOrder);
        }
    }
}