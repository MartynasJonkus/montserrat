using api.Dtos.Reservation;
using api.Models;
using AutoMapper;

namespace api.MappingProfiles
{
    public class ReservationMappingProfile : Profile
    {
        public ReservationMappingProfile()
        {
            CreateMap<CreateReservationDto, Reservation>();
            CreateMap<UpdateReservationDto, Reservation>();
            CreateMap<Reservation, ReservationDto>();
        }
    }
}