using api.Data;
using api.Enums;
using api.Interfaces.Repositories;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly ApplicationDbContext _context;
        public PaymentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Payment?> GetPaymentByIdAsync(int orderId)
        {
            return await _context.Payments
                .FirstOrDefaultAsync(p => p.Id == orderId);
        }
        public async Task<IEnumerable<Payment>> GetPaymentsByOrderIdAsync(int orderId)
        {
            return await _context.Payments
                .Where(payment => payment.OrderId == orderId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Payment>> GetAllPaymentsAsync(int merchantId, EmployeeType employeeType, int pageNumber, int pageSize)
        {
            var query = _context.Payments
                .AsQueryable();

            if (employeeType != EmployeeType.admin)
            {
                query = query.Where(p => p.MerchantId == merchantId);
            }

            return await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        public async Task AddPaymentAsync(Payment payment)
        {
            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();
        }


        public async Task<Refund?> GetRefundByIdAsync(int refundId)
        {
            return await _context.Refunds
                .FirstOrDefaultAsync(r => r.Id == refundId);
        }
        
        public async Task<IEnumerable<Refund>> GetAllRefundsAsync(int merchantId, EmployeeType employeeType, int pageNumber, int pageSize)
        {
            var query = _context.Refunds
                .AsQueryable();

            if (employeeType != EmployeeType.admin)
            {
                query = query.Where(p => p.MerchantId == merchantId);
            }

            return await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        public async Task AddRefundAsync(Refund refund)
        {
            _context.Refunds.Add(refund);
            await _context.SaveChangesAsync();
        }
    }
}