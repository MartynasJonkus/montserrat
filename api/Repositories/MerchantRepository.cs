using api.Data;
using api.Interfaces.Repositories;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class MerchantRepository : IMerchantRepository
    {
        private readonly ApplicationDbContext _context;

        public MerchantRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Merchant?> GetByIdAsync(int id)
        {
            return await _context.Merchants
                .Include(m => m.Address)
                .FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<IEnumerable<Merchant>> GetAllAsync()
        {
            return await _context.Merchants.Include(m => m.Address).ToListAsync();
        }

        public async Task AddAsync(Merchant merchant)
        {
            _context.Merchants.Add(merchant);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Merchant merchant)
        {
            _context.Merchants.Update(merchant);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var merchant = await GetByIdAsync(id);
            if (merchant != null)
            {
                _context.Merchants.Remove(merchant);
                await _context.SaveChangesAsync();
            }
        }
    }
}