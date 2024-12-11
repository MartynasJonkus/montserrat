using api.Models;

namespace api.Interfaces.Repositories
{
    public interface IProductRepository
    {
        Task<Product?> AddProductAsync(Product product);
        Task<IEnumerable<Product>> GetAllProductsAsync(int pageNumber, int pageSize);
        Task<Product?> GetProductByIdAsync(int id);
        Task UpdateProductAsync(Product product);
        Task DeleteProductAsync(Product product);
    }
}