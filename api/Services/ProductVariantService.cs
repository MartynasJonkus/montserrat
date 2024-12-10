using api.Dtos.Product;
using api.Interfaces.Repositories;
using api.Interfaces.Services;
using api.Models;
using AutoMapper;

namespace api.Services
{
    public class ProductVariantService : IProductVariantService
    {
        private readonly IProductVariantRepository _repository;
        private readonly IMapper _mapper;

        public ProductVariantService(IProductVariantRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<ProductVariantDto> AddVariantAsync(int productId, CreateProductVariantDto createProductVariantDto)
        {
            var variant = _mapper.Map<ProductVariant>(createProductVariantDto);
            variant.ProductId = productId;
            await _repository.AddVariantAsync(variant);
            return _mapper.Map<ProductVariantDto>(variant);
        }

        public async Task<IEnumerable<ProductVariantDto>> GetVariantsByProductIdAsync(int productId)
        {
            var variants = await _repository.GetVariantsByProductIdAsync(productId);
            return _mapper.Map<IEnumerable<ProductVariantDto>>(variants);
        }

        public async Task<ProductVariantDto?> GetVariantByIdAsync(int variantId)
        {
            var variant = await _repository.GetVariantByIdAsync(variantId);
            return variant == null ? null : _mapper.Map<ProductVariantDto>(variant);
        }

        public async Task<ProductVariantDto?> UpdateVariantAsync(int variantId, CreateProductVariantDto createProductVariantDto)
        {
            var existingVariant = await _repository.GetVariantByIdAsync(variantId);
            if (existingVariant == null)
                return null;

            _mapper.Map(createProductVariantDto, existingVariant);
            await _repository.UpdateVariantAsync(existingVariant);
            return _mapper.Map<ProductVariantDto>(existingVariant);
        }

        public async Task<bool> DeleteVariantAsync(int productId, int variantId)
        {
            var variant = await _repository.GetVariantByIdAsync(variantId);
            if (variant == null || variant.ProductId != productId)
                return false;

            await _repository.DeleteVariantAsync(variant);
            return true;
        }
    }
}