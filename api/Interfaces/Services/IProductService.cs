using api.Dtos.Product;
using api.Enums;

namespace api.Interfaces.Services
{
    public interface IProductService
    {
        Task<ProductDto?> GetProductByIdAsync(int id);
        Task<IEnumerable<ProductDto>> GetAllProductsAsync(int merchantId, EmployeeType employeeType, int pageNumber, int pageSize);
        Task<ProductDto> AddProductAsync(int merchantId, CreateProductDto createProductDto);
        Task<ProductDto?> UpdateProductAsync(int id, CreateProductDto createProductDto);
        Task<bool> DeleteProductAsync(int id);
    }
}