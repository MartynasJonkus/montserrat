using api.Dtos.Payment;
using api.Enums;
using api.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/payment")]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;
        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpGet("{orderId}")]
        public async Task<IActionResult> GetPaymentsByOrder([FromRoute] int orderId)
        {
            var paymentDtos = await _paymentService.GetPaymentsByOrderIdAsync(orderId);
            return Ok(paymentDtos);
        }

        [HttpGet]
        public async Task<IActionResult> GetPayments([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
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

            var paymentDtos = await _paymentService.GetAllPaymentsAsync(merchantId, employeeType, pageNumber, pageSize);
            return Ok(paymentDtos);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePayment([FromBody] CreatePaymentDto createPaymentDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var merchantIdClaim = User.FindFirst("MerchantId");
            if (merchantIdClaim == null || !int.TryParse(merchantIdClaim.Value, out var merchantId))
            {
                return Unauthorized("MerchantId is missing or invalid in the token.");
            }

            var paymentDto = await _paymentService.CreatePaymentAsync(merchantId, createPaymentDto);
            return Created("", paymentDto);
        }

        [HttpGet("refund/{refundId}")]
        public async Task<IActionResult> GetRefund([FromRoute] int refundId)
        {
            var refundDto = await _paymentService.GetRefundByIdAsync(refundId);
            if (refundDto == null) return NotFound();
            return Ok(refundDto);
        }

        [HttpGet("refund")]
        public async Task<IActionResult> GetRefunds([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
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

            var refundDtos = await _paymentService.GetAllRefundsAsync(merchantId, employeeType, pageNumber, pageSize);
            return Ok(refundDtos);
        }

        [HttpPost("refund")]
        public async Task<IActionResult> CreateRefund([FromBody] CreateRefundDto createRefundDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var merchantIdClaim = User.FindFirst("MerchantId");
            if (merchantIdClaim == null || !int.TryParse(merchantIdClaim.Value, out var merchantId))
            {
                return Unauthorized("MerchantId is missing or invalid in the token.");
            }

            var refundDto = await _paymentService.CreateRefundAsync(merchantId, createRefundDto);
            return Created("", refundDto);
        }
    }
}