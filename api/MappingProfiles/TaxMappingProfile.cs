using api.Dtos.Tax;
using api.Models;
using AutoMapper;

namespace api.MappingProfiles
{
    public class TaxMappingProfile : Profile
    {
        public TaxMappingProfile()
        {
            CreateMap<CreateUpdateTaxDto, Tax>();
            CreateMap<Tax, TaxDto>();           
        }
    }
}