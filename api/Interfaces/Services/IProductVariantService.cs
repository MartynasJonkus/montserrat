using api.Dtos.Product;

namespace api.Interfaces.Services
{
    public interface IProductVariantService
    {
        Task<ProductVariantDto> AddVariantAsync(int productId, CreateProductVariantDto createProductVariantDto);
        Task<IEnumerable<ProductVariantDto>> GetVariantsByProductIdAsync(int productId);
        Task<ProductVariantDto?> GetVariantByIdAsync(int variantId);
        Task<ProductVariantDto?> UpdateVariantAsync(int variantId, CreateProductVariantDto createProductVariantDto);
        Task<bool> DeleteVariantAsync(int productId, int variantId);
    }
}