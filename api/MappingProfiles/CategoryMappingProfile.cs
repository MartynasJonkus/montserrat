using api.Dtos.Category;
using api.Models;
using AutoMapper;

namespace api.MappingProfiles
{
    public class CategoryMappingProfile : Profile
    {
        public CategoryMappingProfile()
        {
            CreateMap<CreateUpdateCategoryDto, Category>();
            CreateMap<Category, CategoryDto>();           
        }
    }
}