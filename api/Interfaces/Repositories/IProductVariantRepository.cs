using api.Models;

namespace api.Interfaces.Repositories
{
    public interface IProductVariantRepository
    {
        Task<ProductVariant?> GetVariantByIdAsync(int variantId);
        Task<IEnumerable<ProductVariant>> GetVariantsByProductIdAsync(int productId);
        Task<ProductVariant> AddVariantAsync(ProductVariant productVariant);
        Task UpdateVariantAsync(ProductVariant productVariant);
        Task DeleteVariantAsync(ProductVariant productVariant);
    }
}