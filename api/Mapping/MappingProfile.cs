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

            CreateMap<CreateProductVariantDto, ProductVariant>();
            CreateMap<ProductVariant, ProductVariantDto>();

            CreateMap<CreateProductDto, Product>();
            CreateMap<Product, ProductDto>()
                .ForMember(dest => dest.ProductVariants, 
                    opt => opt.MapFrom(src => src.ProductVariants));
        }
    }
}