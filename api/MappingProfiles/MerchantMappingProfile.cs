using api.Dtos.Merchant;
using api.Models;
using AutoMapper;

namespace api.MappingProfiles
{
    public class MerchantMappingProfile : Profile
    {
        public MerchantMappingProfile()
        {
            CreateMap<Merchant, MerchantDto>();
        }
    }
}