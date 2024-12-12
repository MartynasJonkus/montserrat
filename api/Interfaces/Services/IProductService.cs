using api.Dtos.Product;

namespace api.Interfaces.Services
{
    public interface IProductService
    {
        Task<ProductDto?> GetProductByIdAsync(int id);
        Task<IEnumerable<ProductDto>> GetAllProductsAsync(int pageNumber, int pageSize);
        Task<ProductDto> AddProductAsync(CreateProductDto createProductDto);
        Task<ProductDto?> UpdateProductAsync(int id, CreateProductDto createProductDto);
        Task<bool> DeleteProductAsync(int id);
    }
}