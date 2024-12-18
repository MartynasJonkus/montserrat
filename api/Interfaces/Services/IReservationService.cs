using api.Dtos.Reservation;

namespace api.Interfaces.Services
{
    public interface IReservationService
    {
        Task<ReservationDto> CreateReservationAsync(CreateReservationDto createReservationDto);
        Task<IEnumerable<ReservationDto>> GetReservationsAsync();
        Task<ReservationDto?> GetReservationByIdAsync(int reservationId);
        Task<ReservationDto?> UpdateReservationAsync(int reservationId, UpdateReservationDto updateReservationDto);
        Task<bool> DeleteReservationAsync(int reservationId);
        Task<IEnumerable<ReservationDto>> GetReservationsByCustomerIdAsync(int customerId);
    }
}