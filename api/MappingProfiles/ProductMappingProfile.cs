using api.Dtos.Product;
using api.Models;
using AutoMapper;

namespace api.MappingProfiles
{
    public class ProductMappingProfile : Profile
{
    public ProductMappingProfile()
    {
        CreateMap<Product, ProductDto>().ReverseMap();
        CreateMap<CreateProductDto, Product>();
    }
}
}