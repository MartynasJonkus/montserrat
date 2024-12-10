using api.Models;

namespace api.Interfaces.Repositories
{
    public interface IProductVariantRepository
    {
        Task<ProductVariant> AddVariantAsync(ProductVariant productVariant);
        Task<IEnumerable<ProductVariant>> GetVariantsByProductIdAsync(int productId);
        Task<ProductVariant?> GetVariantByIdAsync(int variantId);
        Task UpdateVariantAsync(ProductVariant productVariant);
        Task DeleteVariantAsync(ProductVariant productVariant);
    }
}