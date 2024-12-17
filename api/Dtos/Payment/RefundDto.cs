using api.Models;

namespace api.Dtos.Payment
{
    public class RefundDto
    {
        public int Id { get; set; }
        public int PaymentId { get; set; }
        public required Price RefundAmount { get; set; }
        public string Reason { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}