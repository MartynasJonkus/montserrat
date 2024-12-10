using api.Dtos.Product;

namespace api.Interfaces.Services
{
    public interface IProductService
    {
        Task<ProductDto> AddProductAsync(CreateProductDto createProductDto);
        Task<IEnumerable<ProductDto>> GetAllProductsAsync(int pageNumber, int pageSize);
        Task<ProductDto?> GetProductByIdAsync(int id);
        Task<ProductDto?> UpdateProductAsync(int id, CreateProductDto createProductDto);
        Task<bool> DeleteProductAsync(int id);
    }
}