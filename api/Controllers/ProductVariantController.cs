using api.Dtos.Product;
using api.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/variants")]
    public class ProductVariantController : ControllerBase
    {
        private readonly IProductVariantService _variantService;

        public ProductVariantController(IProductVariantService variantService)
        {
            _variantService = variantService;
        }

        [HttpGet("{variantId}")]
        public async Task<IActionResult> GetVariantById(int variantId)
        {
            var variant = await _variantService.GetVariantByIdAsync(variantId);
            if (variant == null)
                return NotFound(new { message = "Variant not found" });

            return Ok(variant);
        }

        [HttpPut("{variantId}")]
        public async Task<IActionResult> UpdateVariant(int variantId, [FromBody] CreateProductVariantDto createProductVariantDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingVariant = await _variantService.GetVariantByIdAsync(variantId);
            if (existingVariant == null)
                return NotFound(new { message = "Variant not found" });

            await _variantService.UpdateVariantAsync(variantId, createProductVariantDto);
            return Ok();
        }
    }
}