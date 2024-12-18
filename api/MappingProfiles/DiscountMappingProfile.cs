using api.Dtos.Discount;
using api.Models;
using AutoMapper;

namespace api.MappingProfiles
{
    public class DiscountMappingProfile : Profile
    {
        public DiscountMappingProfile()
        {
            CreateMap<CreateUpdateDiscountDto, Discount>();
            CreateMap<Discount, DiscountDto>();           
        }
    }
}