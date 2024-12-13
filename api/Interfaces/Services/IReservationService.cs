using api.Dtos.Reservation;
using api.Models;

namespace api.Interfaces.Services
{
    public interface IReservationService
    {
        Task<Reservation> CreateReservationAsync(CreateReservationDto createReservationDto);
        Task<IEnumerable<Reservation>> GetReservationsAsync();
        Task<Reservation?> GetReservationAsync(int reservationId);
        Task<Reservation?> UpdateReservationAsync(int reservationId, UpdateReservationDto updateReservationDto);
        Task<bool> DeleteReservationAsync(int reservationId);
    }
}