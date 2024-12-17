using api.Models;

namespace api.Interfaces.Repositories
{
    public interface IReservationRepository
    {
        Task AddAsync(Reservation reservation);
        Task<IEnumerable<Reservation>> GetAllAsync();
        Task<Reservation?> GetByIdAsync(int reservationId);
        Task UpdateAsync(Reservation reservation);
        Task DeleteAsync(Reservation reservation);
        Task<IEnumerable<Reservation>> GetReservationsByCustomerIdAsync(int customerId);
    }
}