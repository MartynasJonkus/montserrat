using api.Data;
using api.Dtos.Order;
using api.Enums;
using api.Interfaces.Repositories;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class OrderDiscountRepository : IOrderDiscountRepository
    {
        private readonly ApplicationDbContext _context;

        public OrderDiscountRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<OrderDiscount?> GetOrderDiscountByIdAsync(int id)
        {
            return await _context.OrderDiscounts
                .FirstOrDefaultAsync(o => o.Id == id);
        }

        public async Task<IEnumerable<OrderDiscount>> GetAllOrderDiscountsAsync(int merchantId, EmployeeType employeeType, int pageNumber, int pageSize)
        {
            var query = _context.OrderDiscounts
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

        public async Task AddOrderDiscountAsync(OrderDiscount orderDiscount)
        {
            _context.OrderDiscounts.Add(orderDiscount);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateOrderDiscountAsync(OrderDiscount orderDiscount)
        {
            _context.OrderDiscounts.Update(orderDiscount);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteOrderDiscountAsync(OrderDiscount orderDiscount)
        {
            _context.OrderDiscounts.Remove(orderDiscount);
            await _context.SaveChangesAsync();
        } 
    }
}