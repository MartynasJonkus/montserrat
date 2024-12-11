using api.Dtos.Employee;
using api.Enums;
using api.Models;
using AutoMapper;


namespace api.MappingProfiles
{
    public class EmployeeMappingProfile : Profile
    {
        public EmployeeMappingProfile() 
        {
        CreateMap<Employee, EmployeeDto>();

        CreateMap<CreateEmployeeDto, Employee>()
            .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow))
            .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow))
            .ForMember(dest => dest.Status, opt => opt.MapFrom(_ => Status.active));

        CreateMap<UpdateEmployeeDto, Employee>()
            .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow));
        }  
    }
}