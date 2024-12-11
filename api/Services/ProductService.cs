using api.Dtos.Product;
using api.Enums;
using api.Interfaces.Repositories;
using api.Interfaces.Services;
using api.Models;
using AutoMapper;

namespace api.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IProductVariantService _variantService;
        private readonly IMapper _mapper;
        

        public ProductService(IProductRepository productRepository, IProductVariantService variantService, IMapper mapper)
        {
            _productRepository = productRepository;
            _variantService = variantService;
            _mapper = mapper;
        }

        public async Task<ProductDto> AddProductAsync(CreateProductDto createProductDto)
        {
            var product = _mapper.Map<Product>(createProductDto);

            var createdProduct = await _productRepository.AddProductAsync(product)
                ?? throw new InvalidOperationException("Failed to create the product in the database.");
            
            var defaultVariant = new CreateProductVariantDto
            {
                Title = "Default",
                AdditionalPrice = 0,
                Quantity = 0,
                Status = Status.active
            };
            
            await _variantService.AddVariantAsync(createdProduct.Id, defaultVariant);

            return _mapper.Map<ProductDto>(createdProduct);
        }

        public async Task<IEnumerable<ProductDto>> GetAllProductsAsync(int pageNumber, int pageSize)
        {
            var products = await _productRepository.GetAllProductsAsync(pageNumber, pageSize);
            return _mapper.Map<IEnumerable<ProductDto>>(products);
        }

        public async Task<ProductDto?> GetProductByIdAsync(int id)
        {
            var product = await _productRepository.GetProductByIdAsync(id);
            return product == null ? null : _mapper.Map<ProductDto>(product);
        }

        public async Task<ProductDto?> UpdateProductAsync(int id, CreateProductDto createProductDto)
        {
            var existingProduct = await _productRepository.GetProductByIdAsync(id);
            if (existingProduct == null)
                return null;

            _mapper.Map(createProductDto, existingProduct);
            existingProduct.UpdatedAt = DateTime.UtcNow;
            await _productRepository.UpdateProductAsync(existingProduct);

            return _mapper.Map<ProductDto>(existingProduct);
        }

        public async Task<bool> DeleteProductAsync(int id)
        {
            var product = await _productRepository.GetProductByIdAsync(id);
            if (product == null)
                return false;

            await _productRepository.DeleteProductAsync(product);
            return true;
        }
    }
}