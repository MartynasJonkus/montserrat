using api.Data;
using api.Enums;
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

        public async Task<Order?> GetOrderByIdAsync(int id)
        {
            return await _context.Orders
                .Include(o => o.OrderItems)
                .FirstOrDefaultAsync(o => o.Id == id);
        }

        public async Task<IEnumerable<Order>> GetAllOrdersAsync(int merchantId, EmployeeType employeeType, OrderStatus? orderStatus, string sortOrder, int pageNumber, int pageSize)
        {
            var query = _context.Orders.AsQueryable();

            if (employeeType != EmployeeType.admin)
                query = query.Where(c => c.MerchantId == merchantId);

            if (orderStatus.HasValue)
                query = query.Where(o => o.Status == orderStatus.Value);

            query = sortOrder.ToLower() switch
            {
                "desc" => query.OrderByDescending(o => o.CreatedAt),
                _ => query.OrderBy(o => o.CreatedAt),
            };

            return await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Include(o => o.OrderItems)
                .ToListAsync();
        }

        public async Task AddOrderAsync(Order order)
        {
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateOrderAsync(Order order)
        {
            _context.Orders.Update(order);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteOrderAsync(int id)
        {
            var order = await GetOrderByIdAsync(id);

            if (order == null)
                throw new KeyNotFoundException($"Order with ID {id} not found.");

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
        }
    }
}