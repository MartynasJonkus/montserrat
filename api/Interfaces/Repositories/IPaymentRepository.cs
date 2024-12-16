using api.Enums;
using api.Models;

namespace api.Interfaces.Repositories
{
    public interface IPaymentRepository
    {
        Task<Payment?> GetPaymentByIdAsync(int orderId);
        Task<IEnumerable<Payment>> GetPaymentsByOrderIdAsync(int orderId);
        Task<IEnumerable<Payment>> GetAllPaymentsAsync(int merchantId, EmployeeType employeeType, int pageNumber, int pageSize);
        Task AddPaymentAsync(Payment payment);

        Task<Refund?> GetRefundByIdAsync(int refundId);
        Task<IEnumerable<Refund>> GetAllRefundsAsync(int merchantId, EmployeeType employeeType, int pageNumber, int pageSize);
        Task AddRefundAsync(Refund refund);
    }
}