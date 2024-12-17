using api.Dtos.GiftCard;
using api.Enums;
using api.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/giftcards")]
    public class GiftCardController : ControllerBase
       {
        private readonly IGiftCardService _giftCardService;
        public GiftCardController(IGiftCardService giftCardService)
        {
            _giftCardService = giftCardService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetGiftCard([FromRoute] int id)
        {
            var giftCardDto = await _giftCardService.GetGiftCardByIdAsync(id);
            if (giftCardDto == null)
                return NotFound(new { message = "GiftCard not found" });

            return Ok(giftCardDto);
        }

        [HttpGet]
        public async Task<IActionResult> GetGiftCards([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10, [FromQuery] DateTime? createdAtMin = null, [FromQuery] DateTime? createdAtMax = null)
        {
            var merchantIdClaim = User.FindFirst("MerchantId");
            var employeeTypeClaim = User.FindFirst("EmployeeType");

            if (merchantIdClaim == null || employeeTypeClaim == null)
                return Unauthorized("MerchantId or EmployeeType is missing in the token.");

            if (!int.TryParse(merchantIdClaim.Value, out var merchantId))
                return Unauthorized("MerchantId is invalid.");

            if (!Enum.TryParse(employeeTypeClaim.Value, out EmployeeType employeeType))
                return Unauthorized("EmployeeType is invalid.");
            
            var giftCardDtos = await _giftCardService.GetGiftCardsAsync(merchantId, employeeType, pageNumber, pageSize, createdAtMin, createdAtMax);
            return Ok(giftCardDtos);
        }
        [HttpPost]
        public async Task<IActionResult> CreateGiftCard([FromBody] CreateGiftCardDto createGiftCardDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var merchantIdClaim = User.FindFirst("MerchantId");
            if (merchantIdClaim == null || !int.TryParse(merchantIdClaim.Value, out var merchantId))
            {
                return Unauthorized("MerchantId is missing or invalid in the token.");
            }

            var giftCardDto = await _giftCardService.CreateGiftCardAsync(merchantId, createGiftCardDto);
            return Created("", giftCardDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGiftCard([FromRoute] int id, [FromBody] UpdateGiftCardDto updateGiftCardDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updatedGiftCard = await _giftCardService.UpdateGiftCardAsync(id, updateGiftCardDto);
            if (updatedGiftCard == null)
                return NotFound(new { message = "GiftCard not found" });
            
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGiftCard([FromRoute] int id)
        {
            var isDeleted = await _giftCardService.DeleteGiftCardAsync(id);
            if (!isDeleted)
                return NotFound(new { message = "GiftCard not found" });

            return NoContent();
        }
    }
}