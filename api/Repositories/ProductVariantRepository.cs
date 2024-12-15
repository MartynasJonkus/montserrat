using api.Data;
using api.Interfaces.Repositories;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class ProductVariantRepository : IProductVariantRepository
    {
        private readonly ApplicationDbContext _context;

        public ProductVariantRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<ProductVariant> AddVariantAsync(ProductVariant productVariant)
        {
            await _context.ProductVariants.AddAsync(productVariant);
            await _context.SaveChangesAsync();
            return productVariant;
        }

        public async Task<IEnumerable<ProductVariant>> GetVariantsByProductIdAsync(int productId)
        {
            return await _context.ProductVariants
                .Where(v => v.ProductId == productId)
                .ToListAsync();
        }

        public async Task<ProductVariant?> GetVariantByIdAsync(int variantId)
        {
            return await _context.ProductVariants
                .Include(v => v.Product)
                .FirstOrDefaultAsync(v => v.Id == variantId);
        }

        public async Task UpdateVariantAsync(ProductVariant productVariant)
        {
            _context.ProductVariants.Update(productVariant);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteVariantAsync(ProductVariant productVariant)
        {
            _context.ProductVariants.Remove(productVariant);
            await _context.SaveChangesAsync();
        }
    }
}