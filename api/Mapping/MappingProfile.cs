using api.Dtos.Merchant;
using api.Models;
using AutoMapper;

namespace api.Mapping
{
    public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Merchant, MerchantDto>();
    }
}
}