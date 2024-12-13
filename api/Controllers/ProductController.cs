using api.Dtos.Product;
using api.Enums;
using api.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly IProductVariantService _variantService;

        public ProductController(IProductService productService, IProductVariantService variantService)
        {
            _productService = productService;
            _variantService = variantService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var productDto = await _productService.GetProductByIdAsync(id);
            if (productDto == null)
                return NotFound(new { message = "Product not found" });

            return Ok(productDto);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProducts([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var merchantIdClaim = User.FindFirst("MerchantId");
            var employeeTypeClaim = User.FindFirst("EmployeeType");

            if (merchantIdClaim == null || employeeTypeClaim == null)
                return Unauthorized("MerchantId or EmployeeType is missing in the token.");

            if (!int.TryParse(merchantIdClaim.Value, out var merchantId))
                return Unauthorized("MerchantId is invalid.");

            if (!Enum.TryParse(employeeTypeClaim.Value, out EmployeeType employeeType))
                return Unauthorized("EmployeeType is invalid.");


            var products = await _productService.GetAllProductsAsync(merchantId, employeeType, pageNumber, pageSize);
            return Ok(products);
        }

        [HttpPost]
        public async Task<IActionResult> AddProduct([FromBody] CreateProductDto createProductDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var merchantIdClaim = User.FindFirst("MerchantId");
            if (merchantIdClaim == null || !int.TryParse(merchantIdClaim.Value, out var merchantId))
            {
                return Unauthorized("MerchantId is missing or invalid in the token.");
            }

            var productDto = await _productService.AddProductAsync(merchantId, createProductDto);
            return CreatedAtAction(nameof(GetProductById), new { id = productDto.Id }, productDto);
        }       

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] CreateProductDto createProductDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updatedProduct = await _productService.UpdateProductAsync(id, createProductDto);
            if (updatedProduct == null)
                return NotFound(new { message = "Product not found" });

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var isDeleted = await _productService.DeleteProductAsync(id);
            if (!isDeleted)
                return NotFound(new { message = "Product not found" });

            return NoContent();
        }

        [HttpGet("{productId}/variants")]
        public async Task<IActionResult> GetVariants(int productId)
        {
            var variants = await _variantService.GetVariantsByProductIdAsync(productId);
            return Ok(variants);
        }

        [HttpPost("{productId}/variants")]
        public async Task<IActionResult> CreateVariant(int productId, [FromBody] CreateProductVariantDto createProductVariantDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var variant = await _variantService.AddVariantAsync(productId, createProductVariantDto);
            return Created("", variant);
        }

        [HttpDelete("{productId}/variants/{variantId}")]
        public async Task<IActionResult> DeleteVariant(int productId, int variantId)
        {
            var isDeleted = await _variantService.DeleteVariantAsync(productId, variantId);
            if (!isDeleted)
                return NotFound(new { message = "Product/Variant not found or mismatch" });

            return NoContent();
        }
    }
}