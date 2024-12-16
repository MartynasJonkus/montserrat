using api.Models;

namespace api.Dtos.Payment
{
    public class CreateRefundDto
    {
        public int PaymentId { get; set; }
        public required Price RefundAmount { get; set; }
        public string Reason { get; set; } = string.Empty;
    }
}