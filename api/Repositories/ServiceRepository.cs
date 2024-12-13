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

        public async Task<IEnumerable<Service>> GetServicesAsync(string category, int limit)
        {
            var query = _context.Services.Include(s => s.Category).AsQueryable();

            if (!string.IsNullOrEmpty(category))
            {
                query = query.Where(s => s.Category != null && s.Category.Title == category);
            }

            if (limit > 0)
            {
                query = query.Take(limit);
            }

            return await query.ToListAsync();
        }

        public async Task<Service?> GetByIdAsync(int serviceId)
        {
            return await _context.Services
                .Include(s => s.Category)
                .Include(s => s.Merchant)
                .Include(s => s.Employee)
                .Include(s => s.Discount)
                .Include(s => s.Tax)
                .FirstOrDefaultAsync(s => s.Id == serviceId);
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
            // Implement the logic to check available times
            // This is just a placeholder implementation
            return await Task.FromResult(new List<DateTime>
            {
                date.AddHours(9),
                date.AddHours(10),
                date.AddHours(11)
            });
        }
    }
}