using api.Dtos.Employee;
using api.Models;
using AutoMapper;

namespace api.MappingProfiles
{
    public class EmployeeMappingProfile : Profile
    {
        public EmployeeMappingProfile() 
        {
            CreateMap<CreateUpdateEmployeeDto, Employee>();
            CreateMap<Employee, EmployeeDto>();
        }  
    }
}