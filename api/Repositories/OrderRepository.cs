using api.Data;
using api.Interfaces.Repositories;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ApplicationDbContext _context;
        public OrderRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Order?> GetByIdAsync(int id)
        {
            return await _context.Orders
                .Include(o => o.OrderItems)
                .Include(o => o.Payments)
                .FirstOrDefaultAsync(o => o.Id == id);
        }

        public async Task<IEnumerable<Order>> GetAllAsync()
        {
            return await _context.Orders
                .Include(o => o.OrderItems)
                .Include(o => o.Payments)
                .ToListAsync();
        }

        public async Task<Order> AddAsync(Order order)
        {
            _context.Orders.Add(order);
            await SaveChangesAsync();
            return order;
        }

        public async Task<Order> UpdateAsync(Order order)
        {
            var existingOrder = await GetByIdAsync(order.Id);

            if (existingOrder == null)
                throw new KeyNotFoundException($"Order with ID {order.Id} not found.");

            existingOrder.MerchantId = order.MerchantId;
            existingOrder.OrderDiscountId = order.OrderDiscountId;
            existingOrder.Status = order.Status;
            existingOrder.TotalAmount = order.TotalAmount;
            existingOrder.UpdatedAt = DateTime.Now;

            // Update associated collections if needed
            existingOrder.OrderItems = order.OrderItems;
            existingOrder.Payments = order.Payments;

            await SaveChangesAsync();
            return existingOrder;
        }

        public async Task DeleteAsync(int id)
        {
            var order = await GetByIdAsync(id);

            if (order == null)
                throw new KeyNotFoundException($"Order with ID {id} not found.");

            _context.Orders.Remove(order);
            await SaveChangesAsync();
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}