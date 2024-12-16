using api.Dtos.Payment;
using api.Enums;

namespace api.Interfaces.Services
{
    public interface IPaymentService
    {
        Task<IEnumerable<PaymentDto>> GetPaymentsByOrderIdAsync(int orderId);
        Task<IEnumerable<PaymentDto>> GetAllPaymentsAsync(int merchantId, EmployeeType employeeType, int pageNumber, int pageSize);
        Task<PaymentDto> CreatePaymentAsync(int merchantId, CreatePaymentDto createPaymentDto);

        Task<RefundDto?> GetRefundByIdAsync(int refundId);
        Task<IEnumerable<RefundDto>> GetAllRefundsAsync(int merchantId, EmployeeType employeeType, int pageNumber, int pageSize);
        Task<RefundDto> CreateRefundAsync(int merchantId, CreateRefundDto createRefundDto);
    }
}