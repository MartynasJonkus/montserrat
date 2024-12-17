using api.Dtos.Category;
using api.Enums;
using api.Interfaces.Repositories;
using api.Interfaces.Services;
using api.Models;
using AutoMapper;

namespace api.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;
        public CategoryService(ICategoryRepository categoryRepository, IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<CategoryDto>> GetAllCategoriesAsync(int merchantId, EmployeeType employeeType, int pageNumber, int pageSize)
        {
            var categories = await _categoryRepository.GetAllCategoriesAsync(merchantId, employeeType, pageNumber, pageSize);
            return _mapper.Map<IEnumerable<CategoryDto>>(categories);
        }

        public async Task<CategoryDto> CreateCategoryAsync(int merchantId, CreateUpdateCategoryDto createCategoryDto)
        {
            var category = _mapper.Map<Category>(createCategoryDto);
            category.MerchantId = merchantId;

            await _categoryRepository.AddCategoryAsync(category);
            return _mapper.Map<CategoryDto>(category);
        }

        public async Task<Category> UpdateCategoryAsync(int id, CreateUpdateCategoryDto updatedCategory)
        {
            var existingCategory = await _categoryRepository.GetCategoryByIdAsync(id);
            if (existingCategory == null)
                throw new KeyNotFoundException("Customer not found.");

            _mapper.Map(updatedCategory, existingCategory);
            await _categoryRepository.UpdateCategoryAsync(existingCategory);
            return existingCategory;  
        }

        public async Task<bool> DeleteCategoryAsync(int id)
        {
            var existingCategory = await _categoryRepository.GetCategoryByIdAsync(id);
            if (existingCategory == null)
                return false;

            await _categoryRepository.DeleteCategoryAsync(existingCategory);
            return true;
        }
    }
}