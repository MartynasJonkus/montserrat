using api.Data;
using api.Dtos.GiftCard;
using api.Enums;
using api.Interfaces.Repositories;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class GiftCardRepository : IGiftCardRepository
    {
        private readonly ApplicationDbContext _context;
        public GiftCardRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task CreateGiftCardAsync(GiftCard giftCard)
        {
            _context.GiftCards.Add(giftCard);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateGiftCardAsync(GiftCard giftCard)
        {
            _context.GiftCards.Update(giftCard);
            await _context.SaveChangesAsync();
        }
        public async Task<IEnumerable<GiftCard>> GetGiftCardsAsync(int merchantId, EmployeeType employeeType, int pageNumber, int pageSize, DateTime? createdAtMin, DateTime? createdAtMax)
        {
            var query = _context.GiftCards
                .AsQueryable();

            if (employeeType != EmployeeType.admin)
            {
                query = query.Where(g => g.MerchantId == merchantId);
            }

            if (createdAtMin.HasValue)
            {
                query = query.Where(gc => gc.CreatedAt >= createdAtMin.Value);
            }

            if (createdAtMax.HasValue)
            {
                query = query.Where(gc => gc.CreatedAt <= createdAtMax.Value);
            }

            return await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }
        public async Task<GiftCard?> GetGiftCardByIdAsync(int id)
        {
            return await _context.GiftCards
                .FirstOrDefaultAsync(g => g.Id == id);
        }
        public async Task DeleteGiftCardAsync(GiftCard giftCard)
        {
            _context.GiftCards.Remove(giftCard);
            await _context.SaveChangesAsync();
        }
    }
}