using api.Dtos.Category;
using api.Enums;
using api.Models;

namespace api.Interfaces.Services
{
    public interface ICategoryService
    {
        Task<IEnumerable<CategoryDto>> GetAllCategoriesAsync(int merchantId, EmployeeType employeeType, int pageNumber, int pageSize);
        Task<CategoryDto> CreateCategoryAsync(int merchantId, CreateUpdateCategoryDto createCategoryDto);
        Task<Category> UpdateCategoryAsync(int id, CreateUpdateCategoryDto updatedCategory);
        Task<bool> DeleteCategoryAsync(int id);
    }
}