using api.Data;
using api.Interfaces.Repositories;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class ReservationRepository : IReservationRepository
    {
        private readonly ApplicationDbContext _context;

        public ReservationRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Reservation reservation)
        {
            await _context.Reservations.AddAsync(reservation);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Reservation>> GetAllAsync()
        {
            return await _context.Reservations
                .Include(r => r.Service)
                .Include(r => r.Customer)
                .Include(r => r.Employee)
                .ToListAsync();
        }

        public async Task<Reservation?> GetByIdAsync(int reservationId)
        {
            return await _context.Reservations
                .Include(r => r.Service)
                .Include(r => r.Customer)
                .Include(r => r.Employee)
                .FirstOrDefaultAsync(r => r.Id == reservationId);
        }

        public async Task UpdateAsync(Reservation reservation)
        {
            _context.Reservations.Update(reservation);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Reservation reservation)
        {
            _context.Reservations.Remove(reservation);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Reservation>> GetReservationsByCustomerIdAsync(int customerId)
        {
            return await _context.Reservations
                .Where(r => r.CustomerId == customerId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Reservation>> GetOverlappingReservationsForEmployeeAsync(int employeeId, DateTime startTime, DateTime endTime, int? excludeReservationId = null)
        {
            var query = _context.Reservations
                .Where(r => r.EmployeeId == employeeId && r.StartTime < endTime && r.EndTime > startTime);

            if (excludeReservationId.HasValue)
            {
                query = query.Where(r => r.Id != excludeReservationId.Value);
            }

            return await query.ToListAsync();
        }

        public async Task<IEnumerable<Reservation>> GetOverlappingReservationsForServiceAsync(int serviceId, DateTime startTime, DateTime endTime, int? excludeReservationId = null)
        {
            var query = _context.Reservations
                .Where(r => r.ServiceId == serviceId && r.StartTime < endTime && r.EndTime > startTime);

            if (excludeReservationId.HasValue)
            {
                query = query.Where(r => r.Id != excludeReservationId.Value);
            }

            return await query.ToListAsync();
        }
    }
}