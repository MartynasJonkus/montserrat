using api.Dtos.Receipt;

namespace api.Interfaces.Services
{
    public interface IReceiptService
    {
        Task<ReceiptDto?> GetReceiptByReservationIdAsync(int merchantId, int reservationId);
        Task<ReceiptDto?> GetReceiptByOrderIdAsync(int merchantId, int orderId);
    }
}