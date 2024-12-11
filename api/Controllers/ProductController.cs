using api.Dtos.Product;
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

        [HttpPost]
        public async Task<IActionResult> AddProduct([FromBody] CreateProductDto createProductDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var productDto = await _productService.AddProductAsync(createProductDto);
            return CreatedAtAction(nameof(GetProductById), new { id = productDto.Id }, productDto);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProducts([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var products = await _productService.GetAllProductsAsync(pageNumber, pageSize);
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var productDto = await _productService.GetProductByIdAsync(id);
            if (productDto == null)
                return NotFound(new { message = "Product not found" });

            return Ok(productDto);
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

        [HttpPost("{productId}/variants")]
        public async Task<IActionResult> CreateVariant(int productId, [FromBody] CreateProductVariantDto createProductVariantDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var variant = await _variantService.AddVariantAsync(productId, createProductVariantDto);
            return Created("", variant);
        }

        [HttpGet("{productId}/variants")]
        public async Task<IActionResult> GetVariants(int productId)
        {
            var variants = await _variantService.GetVariantsByProductIdAsync(productId);
            return Ok(variants);
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