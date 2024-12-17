using api.Data;
using api.Enums;
using api.Interfaces.Repositories;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class TaxRepository : ITaxRepository
    {
        private readonly ApplicationDbContext _context;
        public TaxRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task AddTaxAsync(Tax tax)
        {
            _context.Taxes.Add(tax);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateTaxAsync(Tax tax)
        {
            _context.Taxes.Update(tax);
            await _context.SaveChangesAsync();
        }
        public async Task<IEnumerable<Tax>> GetAllTaxesAsync(int merchantId, EmployeeType employeeType, int pageNumber, int pageSize)
        {
            var query = _context.Taxes
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
        public async Task<Tax?> GetTaxByIdAsync(int id)
        {
            return await _context.Taxes
                .FirstOrDefaultAsync(c => c.Id == id);
        }
        public async Task DeleteTaxAsync(Tax tax)
        {
            _context.Taxes.Remove(tax);
            await _context.SaveChangesAsync();
        }
    }
}