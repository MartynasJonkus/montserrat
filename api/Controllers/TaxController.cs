using api.Dtos.Tax;
using api.Enums;
using api.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/taxes")]
    public class TaxController : ControllerBase
       {
        private readonly ITaxService _taxService;
        public TaxController(ITaxService taxService)
        {
            _taxService = taxService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTax([FromRoute] int id)
        {
            var taxDto = await _taxService.GetTaxByIdAsync(id);
            if (taxDto == null)
                return NotFound(new { message = "Product not found" });

            return Ok(taxDto);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTaxes([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var merchantIdClaim = User.FindFirst("MerchantId");
            var employeeTypeClaim = User.FindFirst("EmployeeType");

            if (merchantIdClaim == null || employeeTypeClaim == null)
                return Unauthorized("MerchantId or EmployeeType is missing in the token.");

            if (!int.TryParse(merchantIdClaim.Value, out var merchantId))
                return Unauthorized("MerchantId is invalid.");

            if (!Enum.TryParse(employeeTypeClaim.Value, out EmployeeType employeeType))
                return Unauthorized("EmployeeType is invalid.");
            
            var taxDtos = await _taxService.GetAllTaxesAsync(merchantId, employeeType, pageNumber, pageSize);
            return Ok(taxDtos);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTax([FromBody] CreateUpdateTaxDto createUpdateTaxDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var merchantIdClaim = User.FindFirst("MerchantId");
            if (merchantIdClaim == null || !int.TryParse(merchantIdClaim.Value, out var merchantId))
            {
                return Unauthorized("MerchantId is missing or invalid in the token.");
            }

            var taxDto = await _taxService.CreateTaxAsync(merchantId, createUpdateTaxDto);
            return Created("", taxDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTax([FromRoute] int id, [FromBody] CreateUpdateTaxDto createUpdateTaxDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updatedTax = await _taxService.UpdateTaxAsync(id, createUpdateTaxDto);
            if (updatedTax == null)
                return NotFound(new { message = "Tax not found" });
            
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTax([FromRoute] int id)
        {
            var isDeleted = await _taxService.DeleteTaxAsync(id);
            if (!isDeleted)
                return NotFound(new { message = "Tax not found" });

            return NoContent();
        }
    }
}