using api.Data;
using api.Interfaces.Repositories;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class ServiceRepository : IServiceRepository
    {
        private readonly ApplicationDbContext _context;

        public ServiceRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Service service)
        {
            await _context.Services.AddAsync(service);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Service>> GetServicesAsync(int merchantId, string? category, int limit)
        {
            var query = _context.Services.AsQueryable();

            query = query.Where(s => s.MerchantId == merchantId);

            if (!string.IsNullOrEmpty(category))
            {
                query = query.Where(s => s.Category != null && s.Category.Title == category);
            }

            return await query.Take(limit).ToListAsync();
        }

        public async Task<Service?> GetByIdAsync(int serviceId)
        {
            return await _context.Services.FindAsync(serviceId);
        }

        public async Task UpdateAsync(Service service)
        {
            _context.Services.Update(service);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Service service)
        {
            _context.Services.Remove(service);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<DateTime>> CheckAvailableTimesAsync(int serviceId, DateTime date)
        {
            var service = await _context.Services.FindAsync(serviceId);
            if (service == null)
            {
                return Enumerable.Empty<DateTime>();
            }

            var reservations = await _context.Reservations
                .Where(r => r.ServiceId == serviceId && r.StartTime.Date == date.Date)
                .ToListAsync();

            var availableTimes = CalculateAvailableTimes(service.DurationMins, reservations, date);
            return availableTimes;
        }

        private IEnumerable<DateTime> CalculateAvailableTimes(int durationMins, List<Reservation> reservations, DateTime date)
        {
            var availableTimes = new List<DateTime>();
            var startOfDay = date.Date.AddHours(8); // Assuming the service starts at 8 AM
            var endOfDay = date.Date.AddHours(18); // Assuming the service ends at 6 PM

            var currentTime = startOfDay;
            while (currentTime.AddMinutes(durationMins) <= endOfDay)
            {
                if (!reservations.Any(r => r.StartTime < currentTime.AddMinutes(durationMins) && r.EndTime > currentTime))
                {
                    availableTimes.Add(currentTime);
                }
                currentTime = currentTime.AddMinutes(durationMins);
            }

            return availableTimes;
        }
    }
}