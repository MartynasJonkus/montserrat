using api.Dtos.Product;
using api.Models;
using AutoMapper;

namespace api.MappingProfiles
{
    public class ProductMappingProfile : Profile
    {
        public ProductMappingProfile()
        {
            CreateMap<CreateProductVariantDto, ProductVariant>();
            CreateMap<ProductVariant, ProductVariantDto>();

            CreateMap<CreateProductDto, Product>();
            CreateMap<Product, ProductDto>()
                .ForMember(dest => dest.ProductVariants, opt => opt.MapFrom(src => src.ProductVariants));
        }
    }
}