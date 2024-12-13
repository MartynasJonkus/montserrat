using api.Dtos.Merchant;
using api.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/merchants")]
    public class MerchantController : ControllerBase
    {
        private readonly IMerchantService _merchantService;

        public MerchantController(IMerchantService merchantService)
        {
            _merchantService = merchantService;
        }

        [HttpGet("my-merchant")]
        public async Task<IActionResult> GetMyMerchant()
        {
            var merchantIdClaim = User.FindFirst("MerchantId");
            if (merchantIdClaim == null || !int.TryParse(merchantIdClaim.Value, out var merchantId))
            {
                return Unauthorized("MerchantId is missing or invalid in the token.");
            }

            var merchantDto = await _merchantService.GetMerchantByIdAsync(merchantId);
            if (merchantDto == null)
                return NotFound(new { message = "Merchant not found." });

            return Ok(merchantDto);
        }

        [Authorize(Policy = "AdminOnly")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMerchant(int id)
        {
            var merchantDto = await _merchantService.GetMerchantByIdAsync(id);
            if (merchantDto == null)
                return NotFound(new { message = "Merchant not found" });

            return Ok(merchantDto);
        }

        [Authorize(Policy = "AdminOnly")]
        [HttpGet]
        public async Task<IActionResult> GetAllMerchants()
        {
            var merchantDtos = await _merchantService.GetAllMerchantsAsync();
            return Ok(merchantDtos);
        }

        [Authorize(Policy = "AdminOnly")]
        [HttpPost]
        public async Task<IActionResult> CreateMerchant([FromBody] CreateMerchantDto createMerchantDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var createdMerchantDto = await _merchantService.AddMerchantAsync(createMerchantDto);
            return CreatedAtAction(nameof(GetMerchant), new { id = createdMerchantDto.Id }, createdMerchantDto);
        }

        [Authorize(Policy = "AdminOnly")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMerchant(int id, [FromBody] CreateMerchantDto createMerchantDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updatedMerchant = await _merchantService.UpdateMerchantAsync(id, createMerchantDto);
            if (updatedMerchant == null)
                return NotFound(new { message = "Merchant not found" });

            return Ok();
        }
    }
}
