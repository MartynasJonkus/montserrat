using api.Dtos.Customer;
using api.Models;
using AutoMapper;

namespace api.MappingProfiles
{
    public class CustomerMappingProfile : Profile
    {
        public CustomerMappingProfile() 
        {
        CreateMap<Customer, CustomerDto>();
        CreateMap<CreateUpdateCustomerDto, Customer>();
        }  
    }
}