using api.Dtos.Merchant;
using api.Dtos.Product;
using api.Models;
using AutoMapper;

namespace api.Mapping
{
    public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Merchant, MerchantDto>();
        CreateMap<Product, ProductDto>().ReverseMap();
        CreateMap<CreateProductDto, Product>();
    }
}
}