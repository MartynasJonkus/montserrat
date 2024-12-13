using api.Enums;
using api.Models;

namespace api.Interfaces.Repositories
{
    public interface IProductRepository
    {
        Task<Product?> GetProductByIdAsync(int id);
        Task<IEnumerable<Product>> GetAllProductsAsync(int merchantId, EmployeeType employeeType, int pageNumber, int pageSize);
        Task<Product?> AddProductAsync(Product product);
        Task UpdateProductAsync(Product product);
        Task DeleteProductAsync(Product product);
    }
}