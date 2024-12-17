using api.Data;
using api.Enums;
using api.Interfaces.Repositories;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class DiscountRepository : IDiscountRepository
    {
        private readonly ApplicationDbContext _context;
        public DiscountRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task AddDiscountAsync(Discount discount)
        {
            _context.Discounts.Add(discount);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateDiscountAsync(Discount discount)
        {
            _context.Discounts.Update(discount);
            await _context.SaveChangesAsync();
        }
        public async Task<IEnumerable<Discount>> GetAllDiscountsAsync(int merchantId, EmployeeType employeeType, int pageNumber, int pageSize)
        {
            var query = _context.Discounts
                .AsQueryable();

            if (employeeType != EmployeeType.admin)
            {
                query = query.Where(c => c.MerchantId == merchantId);
            }

            return await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }
        public async Task<Discount?> GetDiscountByIdAsync(int id)
        {
            return await _context.Discounts
                .FirstOrDefaultAsync(d => d.Id == id);
        }
        public async Task DeleteDiscountAsync(Discount discount)
        {
            _context.Discounts.Remove(discount);
            await _context.SaveChangesAsync();
        }
    }
}